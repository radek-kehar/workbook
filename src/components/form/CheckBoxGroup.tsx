import CheckBox from "./CheckBox";
import React from "react";
import {CheckBoxDef, CheckBoxModel} from "@model/form";

type CheckboxGroupProps<T> = {
    value: (CheckBoxDef & CheckBoxModel<T>)[],
    onChange: (event: CheckBoxModel<T>) => void
};

const CheckBoxGroup = <T extends any>({value, onChange}: CheckboxGroupProps<T>) => {

    // // vraci cele pole s prenastavenyma hodnotama
    // const handleChange = (event) => {
    //     const temp = value.map(item => {
    //         if (item.name === event.name) {
    //             return {...item, value: event.value}
    //
    //         } else {
    //             return item
    //         }
    //     })
    //     onChange(temp)
    // }

    const handleChange = (event) => {
        onChange(event)
    }

    return (
        <div>
            {value.map((item: CheckBoxDef & CheckBoxModel<T>) =>
                <CheckBox key={item.name.toString()} label={item.label} name={item.name} value={item.value} onChange={handleChange}/>
            )}
        </div>
    )
}

export default CheckBoxGroup;
