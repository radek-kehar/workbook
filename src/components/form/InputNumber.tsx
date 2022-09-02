import React, {useContext} from "react";
import {InputModel} from "model/form";
import ValidationError from "./validation/ValidationError";
import {ValidationContext} from "./validation/ValidationProvider";

type InputNumberProps<T> = {
    label: string,
    min?: number,
    max?: number,
    onChange: (event: InputModel<string, number>) => void
} & InputModel<string, number>;

const InputNumber = <T extends any>({label, name, min, max, value, onChange }: InputNumberProps<T>) => {

    const validation = useContext(ValidationContext);

    const handleChange = (event) => {
        onChange({
            name: name, // event.target.name
            value: Number(event.target.value)
        })
    }

    return (
        <>
            <label>
                {label}
                <input type='number' min={min} max={max} name={name} value={value} onInput={handleChange}/>
            </label>
            <ValidationError value={validation.getError(name)}/>
        </>
    )
}

export default InputNumber;