import React, {useContext, useState} from "react";
import Button, {ButtonMode} from "@/components/form/Button";
import {useNavigate} from "react-router-dom";
import {InputModel} from "@/model/form";
import {Validate} from "@/model/validation";
import {ValidationDispatchContext, ValidationProvider} from "@/components/form/validation/ValidationProvider";
import InputNumber from "@/components/form/InputNumber";
import {ProfileContext, ProfileDispatchContext} from "@/components/profile/ProfileProvider";
import {SettingsModel} from "@/model/settings";
import ToolbarContainers from "@/components/containers/ToolbarContainers";
import PageHeader from "@/components/basic/PageHeader";
import FormSection from "@/components/basic/FormSection";

const validates: Validate<SettingsModel>[] = [
    (value: SettingsModel) => {
        if (value.count < 1) {
            return {key: 'count', error: 'Počet příkladů musí být větší než 1.'};
        }
        return true;
    }
]

const Form = () => {
    const navigate = useNavigate();

    const {settings} = useContext(ProfileContext);
    const {dispatchSettings} = useContext(ProfileDispatchContext);

    const validate = useContext(ValidationDispatchContext);

    const [model, setModel] = useState<SettingsModel>({...settings});

    const handleChangeInput = <T extends any>(value: InputModel<string, T>) => {
        setModel({...model, [value.name]: value.value})
    }

    const handleStart = () => {
        const formValidation = validate(model);
        if (formValidation.isValid()) {
            dispatchSettings.set(model);
            navigate("/");
        }
    }

    const handleCancel = () => {
        navigate("/");
    }

    return (
        <form>
            <FormSection>
                <InputNumber label='Počet příkladů v rámci jednoho cvičení'
                         min={1}
                         name='count'
                         value={model.count}
                         onChange={handleChangeInput}/>

                {/*TODO: Funkcionalita je zatím vypnuta. V komponente ExerciseForm je nutne zprovoznit chovani aplikace.*/}
                {/*<div className="mt-4">*/}
                {/*    <CheckBox label='Při chybné odpovědi pokračovat'*/}
                {/*              description="Při chybné odpovědi bude možné pokračovat na další příklad."*/}
                {/*              name='continueWithError'*/}
                {/*              value={model.continueWithError}*/}
                {/*              onChange={handleChangeInput}/>*/}
                {/*</div>*/}
            </FormSection>

            <ToolbarContainers className="mt-4">
                <Button mode={ButtonMode.THEMATHIC} type='button' text='Uložit' click={handleStart}/>
                <Button mode={ButtonMode.SECONDARY} type='button' text='Zrušit' click={handleCancel}/>
            </ToolbarContainers>
        </form>
    )
}

const SettingsForm = () => {
    return (
        <>
            <PageHeader description="Úprava nastavení" title="Nastavení"/>
            <ValidationProvider validates={validates}>
                <Form/>
            </ValidationProvider>
        </>
    )
}

export default SettingsForm;
