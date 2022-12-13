import React from "react";
import {InputModel} from "@/model/form";

type CheckBoxProps<N extends keyof any> = {
    description?: string,
    label: string,
    onChange: (event: InputModel<N, boolean>) => void
} & InputModel<N, boolean>;

const CheckBox = <N extends keyof any>({ description, label, name, value, onChange }: CheckBoxProps<N>) => {

    const handleChange = () => {
        onChange({
            name: name,
            value: !value
        })
    };

    return (
        <div className="relative flex items-start">
            <div className="flex h-5 items-center">
                <input
                    id={name.toString()}
                    name={name.toString()}
                    aria-describedby={`${name.toString()}-description`}
                    type="checkbox"
                    checked={value}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-theme-background focus:ring-theme-background"
                />
            </div>
            <div className="ml-2 text-sm">
                <label htmlFor={name.toString()} className="font-medium text-gray-700">
                    {label}
                </label>
                {description &&
                    <p id={`${name.toString()}-description`} className="text-gray-500">
                        {description}
                    </p>
                }
            </div>
        </div>
    );
};

export default CheckBox;
