import {NumericRange as NumericRangeModel} from "@/model/generator";
import InputNumber from "@/components/form/InputNumber";
import React, {useContext} from "react";
import {InputModel} from "@/model/form";
import {ValidationContext} from "@/components/form/validation/ValidationProvider";
import ValidationError from "@/components/form/validation/ValidationError";

type NumericRangeProps = {
    onChange: (event: InputModel<string, NumericRangeModel>) => void,
} & InputModel<string, NumericRangeModel>;

const NumericRange = ({name, value, onChange}: NumericRangeProps) => {

    const validation = useContext(ValidationContext);

    const handleChange = (event) => {
        const newRange = {...value, [event.name]: event.value}
        onChange({
            name,
            value: newRange
        })
    }

    return (
        <>
            <InputNumber label='Od'
                         name='minDigit'
                         value={value.minDigit}
                         required
                         onChange={handleChange}/>
            <InputNumber label='Do'
                         name='maxDigit'
                         value={value.maxDigit}
                         required
                         onChange={handleChange}/>
            <ValidationError value={validation.getError(name)}/>
        </>
    )
}

export default NumericRange;
