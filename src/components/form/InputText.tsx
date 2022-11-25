import React, {useContext} from "react";
import {InputModel} from "@/model/form";
import {ValidationContext} from "@/components/form/validation/ValidationProvider";
import ValidationError from "@/components/form/validation/ValidationError";

type InputTextProps = {
    label: string,
    onChange: (event: InputModel<string, string>) => void
} & InputModel<string, string>;

const InputText = ({label, name, value, onChange }: InputTextProps) => {

    const validation = useContext(ValidationContext);

    const handleChange = (event) => {
        onChange({
            name: name, // event.target.name
            value: event.target.value
        })
    }

    return (
        <>
            <label>
                {label}
                <input type='text' name={name} value={value} onInput={handleChange}/>
            </label>
            <ValidationError value={validation.getError(name)}/>
        </>
    )
}

export default InputText;
