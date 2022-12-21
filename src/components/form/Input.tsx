import React, {FormEventHandler, useContext} from "react";
import {InputModel} from "@/model/form";
import {ValidationContext} from "@/components/form/validation/ValidationProvider";
import ValidationError from "@/components/form/validation/ValidationError";

type InputProps<V extends string | number> = {
    label: string,
    autoFocus?: boolean,
    disabled?: boolean,
    min?: number,
    max?: number,
    type: string,
    onChange?: FormEventHandler<any> | undefined
} & InputModel<string, V>;

const Input = <V extends string | number>({autoFocus, disabled, label, min, max, name, type, value, onChange}: InputProps<V>) => {

    const validation = useContext(ValidationContext);

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <input type={type} id={name} name={name} min={min} max={max} value={value} onInput={onChange} autoFocus={autoFocus} disabled={disabled}
                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
            </div>
            {validation &&
                <div className="mt-1">
                    <ValidationError value={validation.getError(name)}/>
                </div>
            }
        </div>
    )
}

export default Input;
