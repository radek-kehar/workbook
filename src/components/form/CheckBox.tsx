import React, {useContext} from "react";
import {InputModel} from "model/form";
import {ValidationContext} from "./validation/ValidationProvider";
import ValidationError from "./validation/ValidationError";

type CheckBoxProps<N extends keyof any> = {
    label: string,
    onChange: (event: InputModel<N, boolean>) => void
} & InputModel<N, boolean>;

const CheckBox = <N extends keyof any>({ label, name, value, onChange }: CheckBoxProps<N>) => {

    const validation = useContext(ValidationContext);

    const handleChange = () => {
        onChange({
            name: name,
            value: !value
        })
    };

    return (
        <>
            <label>
                <input type="checkbox" checked={value} name={name.toString()} onChange={handleChange} />
                {label}
            </label>
            <ValidationError value={validation.getError(name.toString())}/>
        </>
    );
};

export default CheckBox;
