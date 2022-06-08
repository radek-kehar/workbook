import React from "react";

const InputNumber = ({label, name, value, onChange, min, max, }) => {

    const handleChange = (event) => {
        onChange({
            name: name, // event.target.name
            value: Number(event.target.value)
        })
    }

    return (
        <label>
            {label}
            <input type='number' min={min} max={max} name={name} value={value} onInput={handleChange}/>
        </label>
    )
}

export default InputNumber;
