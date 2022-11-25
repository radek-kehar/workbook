import React, {useContext, useState} from "react";
import {Validate} from "../../model/validation";
import {ProfileInfo} from "../../model/profile";
import {ValidationDispatchContext, ValidationProvider} from "../form/validation/ValidationProvider";
import InputText from "../form/InputText";
import {InputModel} from "../../model/form";
import Button from "../form/Button";

const validates: Validate<ProfileInfo>[] = []

type ProfileInfoFormProps = {
    value: ProfileInfo,
    onSave: (value: ProfileInfo) => void
};

const Form = ({value, onSave}: ProfileInfoFormProps) => {
    const [model, setModel] = useState<ProfileInfo>({...value});
    const validate = useContext(ValidationDispatchContext);

    const handleOnChange = <V extends any>(value: InputModel<string, V>) => {
        setModel({...model, [value.name]: value.value})
    }

    const handleSave = () => {
        const formValidation = validate(model);
        if (formValidation.isValid()) {
            onSave(model);
        }
    }

    return (
        <form>
            <InputText label='Jak se jmenuješ?'
                       name={'name'}
                       value={model.name}
                       onChange={handleOnChange}/>

            <Button type='button' text='Uložit' click={handleSave}/>
        </form>
    )
}

const ProfileInfoForm = ({value, onSave}: ProfileInfoFormProps) => {
    return (
        <ValidationProvider validates={validates}>
            <Form value={value} onSave={onSave}/>
        </ValidationProvider>
    )
}

export default ProfileInfoForm;
