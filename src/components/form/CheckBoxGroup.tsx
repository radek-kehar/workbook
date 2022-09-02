import CheckBox from "./CheckBox";
import React, {useContext} from "react";
import {InputModel} from "model/form";
import {TypeInfo} from "../../message/enums";
import ValidationError from "./validation/ValidationError";
import {ValidationContext} from "./validation/ValidationProvider";

type CheckboxGroupProps<N extends keyof any> = {
    labels: Record<N, TypeInfo>,
    name: string,
    value: (InputModel<N, boolean>)[],
    onChange: (name: string, event: InputModel<N, boolean>) => void
};

const CheckBoxGroup = <N extends keyof any>({labels, name, value, onChange}: CheckboxGroupProps<N>) => {

    const validation = useContext(ValidationContext);

    const handleOnChange = (value: InputModel<N, boolean>) => {
        onChange(name, value)
    }

    return (
        <div>
            {value.map((item: InputModel<N, boolean>) =>
                <CheckBox key={item.name.toString()}
                          label={labels[item.name].label}
                          name={item.name}
                          value={item.value}
                          onChange={handleOnChange}/>
            )}
            <ValidationError value={validation.getError(name)}/>
        </div>
    )
}

export default CheckBoxGroup;
