import React from "react";
import {InputNumberModel} from "model/form";

type InputNumberProps<T> = {
    label: string,
    onChange: (event: InputNumberModel<T>) => void,
    min: number,
    max: number
} & InputNumberModel<T>;

const InputNumber = <T extends any>({label, name, value, onChange, min, max }: InputNumberProps<T>) => {

    const handleChange = (event) => {
        onChange({
            name: name, // event.target.name
            value: Number(event.target.value)
        })
    }

    return (
        <label>
            {label}
            <input type='number' min={min} max={max} name={name.toString()} value={value} onInput={handleChange}/>
        </label>
    )
}

export default InputNumber;
