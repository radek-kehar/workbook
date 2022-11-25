import React, {useContext, useState} from "react";
import Button from "@/components/form/Button";
import {useNavigate} from "react-router-dom";
import {InputModel} from "@/model/form";
import {Validate} from "@/model/validation";
import {ValidationDispatchContext, ValidationProvider} from "@/components/form/validation/ValidationProvider";
import InputNumber from "@/components/form/InputNumber";
import {ProfileContext, ProfileDispatchContext} from "@/components/profile/ProfileProvider";
import {SettingsModel} from "@/model/settings";
import CheckBox from "@/components/form/CheckBox";

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

    return (
        <form>
            <div>
                <InputNumber label='Počet příkladů'
                             min={1}
                             name='count'
                             value={model.count}
                             onChange={handleChangeInput}/>
            </div>
            <div>
                <CheckBox label='Při chybné odpovědi pokračovat'
                          name='continueWithError'
                          value={model.continueWithError}
                          onChange={handleChangeInput}/>
            </div>
            <div>
                <Button type='button' text='Uložit' click={handleStart}/>
            </div>
        </form>
    )
}

const SettingsForm = () => {
    return (
        <ValidationProvider validates={validates}>
            <Form/>
        </ValidationProvider>
    )
}

export default SettingsForm;
