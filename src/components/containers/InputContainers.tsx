import React, {ReactNode, useContext} from "react";
import {ValidationContext} from "@/components/form/validation/ValidationProvider";
import ValidationError from "@/components/form/validation/ValidationError";

export const defaultInputClassName = "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

type InputContainersProps<V extends string | number> = {
    label: string,
    name: string,
    children: ReactNode
};

const InputContainers = <V extends string | number>({label, name, children}: InputContainersProps<V>) => {

    const validation = useContext(ValidationContext);

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                {children}
            </div>
            <div className="mt-1">
                <ValidationError value={validation.getError(name)}/>
            </div>
        </div>
    )
}

export default InputContainers;
