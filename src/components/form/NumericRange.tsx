import {NumericRange as NumericRangeModel} from "../../model/generator";
import InputNumber from "./InputNumber";
import React, {useContext} from "react";
import {InputModel} from "../../model/form";
import ValidationError from "./validation/ValidationError";
import {ValidationContext} from "./validation/ValidationProvider";

type NumericRangeProps = {
    label: string,
    onChange: (event: InputModel<string, NumericRangeModel>) => void,
} & InputModel<string, NumericRangeModel>;

const NumericRange = ({label, name, value, onChange}: NumericRangeProps) => {

    const validation = useContext(ValidationContext);

    const handleChange = (event) => {
        const newRange = {...value, [event.name]: Number(event.value)}
        onChange({
            name,
            value: newRange
        })
    }

    return (
        <>
            <label>
                {label}
                <InputNumber label='Od'
                             max={value.maxDigit}
                             name='minDigit'
                             value={value.minDigit}
                             onChange={handleChange}/>
                <InputNumber label='Do'
                             min={value.minDigit}
                             name='maxDigit'
                             value={value.maxDigit}
                             onChange={handleChange}/>
            </label>
            <ValidationError value={validation.getError(name)}/>
        </>
    )
}

export default NumericRange;
