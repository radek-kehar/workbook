import React from "react";
import {CheckBoxDef, CheckBoxModel} from "@model/form";

type CheckBoxProps<T> = {
    onChange: (event: CheckBoxModel<T>) => void
} & CheckBoxDef & CheckBoxModel<T>;

const CheckBox = <T extends any>({ label, name, value, onChange }: CheckBoxProps<T>) => {

    const handleChange = () => {
        onChange({
            name: name,
            value: !value
        })
    };

    return (
        <label>
            <input type="checkbox" checked={value} onChange={handleChange} />
            {label}
        </label>
    );
};
export default CheckBox;
