import React, {useContext} from "react";
import CheckBoxGroup from "components/form/CheckBoxGroup";
import Button from "components/form/Button";
import {NumericRange as NumericRangeModel, OperationType, Unknown} from "model/generator";
import {operationTypeInfos, unknownInfos} from "message/enums";
import {useNavigate} from "react-router-dom";
import CheckBox from "components/form/CheckBox";
import NumericRange from "../form/NumericRange";
import {ExerciseFormModel, ExerciseModel} from "../../model/exercise";
import {InputField, InputModel} from "../../model/form";
import {Validate} from "../../model/validation";
import {useImmer} from "use-immer";
import {defaultExerciseOptions, valueOfExerciseOptions} from "../../model/factory/exercise";
import {ValidationDispatchContext, ValidationProvider} from "../form/validation/ValidationProvider";
import {ProfileContext, ProfileDispatchContext} from "../profile/ProfileProvider";

const allOperations: OperationType[] = Object.keys(OperationType).filter(item => isNaN(Number(item))).map(item => OperationType[item])

const allUnknowns: Unknown[] = Object.keys(Unknown).filter(item => isNaN(Number(item))).map(item => Unknown[item])

const createModel = (state?: ExerciseModel): ExerciseFormModel => {
    const operations: InputModel<OperationType, boolean>[] = allOperations.map(operation => ({
        name: operation,
        value: state.operations.includes(operation)
    }))

    const range: InputModel<string, NumericRangeModel> = {
        name: 'range',
        value: {minDigit: state.range.minDigit, maxDigit: state.range.maxDigit}
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
        if (value.range.minDigit === value.range.maxDigit) {
            return {key: 'range', error: 'Minimální a maximální hodnota nemůže být stejná.'};
        }
        return true;
    }
]

const Form = () => {
    const navigate = useNavigate();

    const {exercise} = useContext(ProfileContext);
    const {dispatchExercise} = useContext(ProfileDispatchContext);

    const validate = useContext(ValidationDispatchContext);

    const [model, setModel] = useImmer(createModel(exercise));

    const changeValue = <V extends any>(key: string, value: InputModel<any, V>) => {
        setModel((draft: ExerciseFormModel) => {
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
        });
    }

    const handleReset = () => {
        setModel(createModel(defaultExerciseOptions()));
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
        <form>
            <CheckBoxGroup labels={operationTypeInfos}
                           name='operations'
                           value={model.operations}
                           onChange={changeValue}/>

            <NumericRange label='Rozsah'
                          name={model.range.name}
                          value={model.range.value}
                          onChange={(value) => changeValue(model.range.name, value)}/>

            <div>
                <CheckBox label='Ne přes základ 10'
                          name={model.overbase.name}
                          value={model.overbase.value}
                          onChange={(value) => changeValue(model.overbase.name, value)}/>
            </div>

            <CheckBoxGroup labels={unknownInfos}
                           name={'unknowns'}
                           value={model.unknowns}
                           onChange={changeValue}/>

            <Button type='button' text='Reset' click={handleReset}/>
            <Button type='button' text='Spusť' click={handleStart}/>
        </form>
    )
}

const ExerciseForm = () => {
    return (
        <ValidationProvider validates={validates}>
            <Form/>
        </ValidationProvider>
    )
}

export default ExerciseForm;
