import React from "react";
import {InputModel} from "@/model/form";
import InputContainers, {defaultInputClassName} from "@/components/containers/InputContainers";

type InputNumberProps = {
    autoFocus?: boolean,
    disabled?: boolean,
    label: string,
    min?: number,
    max?: number,
    required?: boolean,
    onChange: (event: InputModel<string, number>) => void
} & InputModel<string, number>;

const InputNumber = ({autoFocus, disabled, label, name, min, max, required, value, onChange }: InputNumberProps) => {

    const handleChange = (event) => {
        onChange({
            name: name, // event.target.name
            value: Number(event.target.value.replace(/\D/, ''))
        })
    }

    return (
        <>
            <InputContainers label={label} name={name}>
                <input autoFocus={autoFocus} disabled={disabled} min={min} max={max} name={name} type='number' required={required} value={value} onInput={handleChange}
                       className={defaultInputClassName}/>
            </InputContainers>
        </>
    )
}

export default InputNumber;
