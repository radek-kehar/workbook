import React, {useContext} from "react";
import {InputModel} from "model/form";
import ValidationError from "./validation/ValidationError";
import {ValidationContext} from "./validation/ValidationProvider";

type InputSelectProps<N extends any> = {
    label: string,
    options: InputModel<string, N>[],
    onChange: (event: InputModel<string, N>) => void
} & InputModel<string, N>;

const InputSelect = <N extends keyof any>({label, name, options, value, onChange }: InputSelectProps<N>) => {

    const validation = useContext(ValidationContext);

    const handleChange = (event) => {
        onChange({
            name: name, // event.target.name
            value: JSON.parse(event.target.value)
        })
    }

    return (
        <>
            <label>
                {label}
                <select name={name} value={JSON.stringify(value)} onInput={handleChange}>
                    {options.map(item => <option key={item.name} value={JSON.stringify(item.value)}>{item.name}</option>)}
                </select>
            </label>
            <ValidationError value={validation.getError(name)}/>
        </>
    )
}

export default InputSelect;
