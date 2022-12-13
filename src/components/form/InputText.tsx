import React from "react";
import {InputModel} from "@/model/form";
import InputContainers, {defaultInputClassName} from "@/components/containers/InputContainers";

type InputTextProps = {
    label: string,
    onChange?: (event: InputModel<string, string>) => void,
    autoFocus?: boolean,
    disabled?: boolean
} & InputModel<string, string>;

const InputText = ({autoFocus, disabled, label, name, value, onChange }: InputTextProps) => {

    const handleChange = (event) => {
        onChange({
            name: name, // event.target.name
            value: event.target.value
        })
    }

    return (
        <InputContainers label={label} name={name}>
            <input autoFocus={autoFocus} disabled={disabled} name={name} type='text' value={value} onInput={handleChange}
                   className={defaultInputClassName}/>
        </InputContainers>
    )
}

export default InputText;
