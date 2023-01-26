import React, {useContext} from "react";
import CheckBoxGroup from "@/components/form/CheckBoxGroup";
import Button, {ButtonMode} from "@/components/form/Button";
import {NumericRange as NumericRangeModel, OperationType, Unknown} from "@/model/generator";
import {operationTypeInfos, TypeInfo, unknownInfos} from "@/message/enums";
import {useNavigate} from "react-router-dom";
import CheckBox from "@/components/form/CheckBox";
import NumericRange from "../form/NumericRange";
import {ExerciseFormModel, ExerciseModel} from "@/model/exercise";
import {InputField, InputModel} from "@/model/form";
import {Validate} from "@/model/validation";
import {useImmer} from "use-immer";
import {defaultExerciseOptions, valueOfExerciseOptions} from "@/model/factory/exercise";
import {ValidationDispatchContext, ValidationProvider} from "@/components/form/validation/ValidationProvider";
import {ProfileContext, ProfileDispatchContext} from "@/components/profile/ProfileProvider";
import PageHeader from "@/components/basic/PageHeader";
import ToolbarContainers from "../containers/ToolbarContainers";
import FormSection from "@/components/basic/FormSection";
import ConfirmationAlert, {AnswerType, useConfirmationDialog} from "@/components/modals/ConfirmationAlert";

const allOperations: OperationType[] = Object.keys(OperationType).filter(item => isNaN(Number(item))).map(item => OperationType[item])

const allUnknowns: Unknown[] = Object.keys(Unknown).filter(item => isNaN(Number(item))).map(item => Unknown[item])

const createModel = (state?: ExerciseModel): ExerciseFormModel => {
    const operations: InputModel<OperationType, boolean>[] = allOperations.map(operation => ({
        name: operation,
        value: state.operations.includes(operation)
    }))

    const range: InputModel<string, NumericRangeModel> = {
        name: 'range',
        value: {minDigit: state.range.minDigit, maxDigit: state.range.maxDigit, onlyTens: state.range.onlyTens}
    }

    const overbase: InputModel<string, boolean> = {
        name: 'overbase',
        value: state.overbase
    }

    const unknowns: InputModel<Unknown, boolean>[] = allUnknowns.map(unknown => ({
        name: unknown,
        value: state.unknowns.includes(unknown)
    }))

    return {
        operations,
        range,
        overbase,
        unknowns
    }
}

const validates: Validate<ExerciseModel>[] = [
    (value: ExerciseModel) => {
        if (value.operations.length === 0) {
            return {key: 'operations', error: 'Vyberte alespoň jednu operaci.'};
        }
        return true;
    },
    (value: ExerciseModel) => {
        if (value.unknowns.length === 0) {
            return {key: 'unknowns', error: 'Vyberte alespoň jednu neznámou.'};
        }
        return true;
    },
    (value: ExerciseModel) => {
        if (isNaN(value.range.minDigit) || Number.isNaN(Number.parseInt(value.range.minDigit.toString()))) {
            return {key: 'minDigit', error: 'Minimální hodnota je povinná.'};
        }
        if (isNaN(value.range.maxDigit) || Number.isNaN(Number.parseInt(value.range.maxDigit.toString()))) {
            return {key: 'maxDigit', error: 'Maximální hodnota je povinná.'};
        }
        if (value.range.minDigit === value.range.maxDigit) {
            return {key: 'range', error: 'Minimální a maximální hodnota nemůže být stejná.'};
        }
        if (value.range.minDigit > value.range.maxDigit) {
            return {key: 'range', error: 'Minimální hodnota nemůže být větší než maximální hodnota.'};
        }
        return true;
    },
    (value: ExerciseModel) => {
        if (value.range.onlyTens && value.range.maxDigit - value.range.minDigit <= 10) {
            return {key: 'onlyTens', error: 'Rozsah čísel je příliš malý. Nelze vytvořit příklady pouze s desítkama.'};
        }
        return true;
    }
]

const changeDraft = <V extends any>(draft: ExerciseFormModel, key: string, value: InputModel<any, V>) => {
    if (Array.isArray(draft[key])) {
        const field = draft[key] as InputField<any, any, V>[]
        field.forEach(item => {
            if (item.name === value.name) {
                item.value = value.value
            }
        });
    } else {
        const field = draft[key] as InputField<any, any, V>
        field.value = value.value
    }
}

const Form = () => {
    const navigate = useNavigate();

    const {isOpen, open, close} = useConfirmationDialog();

    const {exercise} = useContext(ProfileContext);
    const {dispatchExercise} = useContext(ProfileDispatchContext);

    const validate = useContext(ValidationDispatchContext);

    const [model, setModel] = useImmer(createModel(exercise));

    const changeValues = (values: {key: string, value: InputModel<any, any>}[]) => {
        setModel((draft: ExerciseFormModel) => {
            values.forEach(item => {
                changeDraft(draft, item.key, item.value);
            })
        });
    }

    const changeValue = <V extends any>(key: string, value: InputModel<any, V>) => {
        setModel((draft: ExerciseFormModel) => {
            changeDraft(draft, key, value);
        });
    }

    const handleReset = () => {
        open();
    }

    const handleOnAnswer = (answer: AnswerType) => {
        close();
        if (answer === AnswerType.YES) {
            setModel(createModel(defaultExerciseOptions()));
        }
    }

    const handleStart = () => {
        const exerciseOptions = valueOfExerciseOptions(model);
        const formValidation = validate(exerciseOptions);
        if (formValidation.isValid()) {
            dispatchExercise.set(exerciseOptions);
            navigate("/example");
        }
    }

    return (
        <form className="flex flex-col">
            <FormSection title="Volba operací" description="Jaké operace chcete procvičovat?">
                <CheckBoxGroup labels={operationTypeInfos}
                               name='operations'
                               value={model.operations}
                               onChange={changeValue}/>
            </FormSection>

            <FormSection title="Volba čísel" description="S jakými čísly chcete procvičovat?">
                <NumericRange name={model.range.name}
                              value={model.range.value}
                              onChange={(value) => changeValue(model.range.name, value)}/>

                <div className="mt-4">
                    <CheckBox label='Nepočítat přes 10'
                              description="Vynechat příklady, ve kterých je nutné počítat přes základ 10. Tzn. vynechat příklady typu: 7 + 8 = 15"
                              name={model.overbase.name}
                              value={!model.overbase.value}
                              onChange={(value) => {
                                  changeValues([
                                      {key: model.overbase.name, value: {...value, value: !value.value}},
                                      {key: model.range.name, value: {...model.range, value: {...model.range.value, onlyTens: false}}}
                                  ]);
                              }}/>
                </div>

                <div className="mt-4">
                    <CheckBox label='Pouze s desítkama'
                              description="Pouze příklady s desítkama. Tzn. pouze příklady typu: 50 + 30 = 80"
                              name="onlyTens"
                              value={model.range.value.onlyTens}
                              onChange={(value) => {
                                  changeValues([
                                      {key: model.overbase.name, value: {name: model.overbase.name, value: true}},
                                      {key: model.range.name, value: {...model.range, value: {...model.range.value, onlyTens: value.value}}}
                                  ]);
                              }
                    }/>
                </div>
            </FormSection>

            <FormSection title="Volba neznámých" description="Doplňování jakých neznámých chcete provcvičovat?">
                <CheckBoxGroup labels={unknownInfos}
                               name={'unknowns'}
                               value={model.unknowns}
                               onChange={changeValue}/>
            </FormSection>

            <ToolbarContainers className="mt-4">
                <Button mode={ButtonMode.THEMATHIC} type='button' text='Spusť' click={handleStart}/>
                <Button mode={ButtonMode.SECONDARY} type='button' text='Reset' click={handleReset}/>
                <ConfirmationAlert descripton="Opravdu chcete vzmazat předvolby cvičení?" title='Smazat cvičení' isOpen={isOpen} onAnswer={handleOnAnswer}/>
            </ToolbarContainers>
        </form>
    )
}

const ExerciseForm = () => {
    return (
        <>
            <PageHeader title="Vytvoření cvičení" description="Vytvořte si vlastní cvičení k procvičování."/>
            <ValidationProvider validates={validates}>
                <Form/>
            </ValidationProvider>
        </>
    )
}

export default ExerciseForm;
