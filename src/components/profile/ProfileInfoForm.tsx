import React, {useContext, useState} from "react";
import {Validate} from "../../model/validation";
import {ProfileInfo} from "../../model/profile";
import {ValidationDispatchContext, ValidationProvider} from "../form/validation/ValidationProvider";
import InputText from "../form/InputText";
import {emptyProfileInfo} from "../../model/factory/profile";
import {InputModel} from "../../model/form";
import Button from "../form/Button";
import {useNavigate} from "react-router-dom";

const validates: Validate<ProfileInfo>[] = [
]

const Form = () => {
    const navigate = useNavigate();

    const [model, setModel] = useState(emptyProfileInfo());
    const validate = useContext(ValidationDispatchContext);

    const handleOnChangeName = (name: InputModel<string, string>) => {
        setModel({...model, name: name.value})
    }

    const handleStart = () => {
        const formValidation = validate(model);
        if (formValidation.isValid()) {
            // todo: set profil
            navigate("/home");
        }
    }

    const buttonText = model.name.length > 0
        ? `Pokračuj jako ${model.name}`
        : 'Pokračuj anonymně'

    return (
        <form>
            <InputText label='Jak se jmenuješ?'
                         name={'name'}
                         value={model.name}
                         onChange={handleOnChangeName}/>

            <Button type='button' text={buttonText} click={handleStart}/>
        </form>
    )
}

const ProfileInfoForm = () => {
    return (
        <ValidationProvider validates={validates}>
            <Form/>
        </ValidationProvider>
    )
}

export default ProfileInfoForm;
