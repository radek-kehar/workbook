import React, {useContext} from "react";
import {InputModel} from "@/model/form";
import InputContainers, {defaultInputClassName} from "@/components/containers/InputContainers";
import {ValidationContext} from "@/components/form/validation/ValidationProvider";
import ValidationError from "@/components/form/validation/ValidationError";

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
            value: event.target.value.replace(/\D/, '')
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
