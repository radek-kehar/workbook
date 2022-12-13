import React, {useContext} from "react";
import {InputModel, InputOption} from "@/model/form";
import {ValidationContext} from "@/components/form/validation/ValidationProvider";
import InputContainers from "@/components/containers/InputContainers";

type InputSelectProps<ID extends number | string> = {
    label: string,
    options: InputOption<ID>[],
    onChange: (event: InputModel<string, InputOption<ID>>) => void
} & InputModel<string, ID>;

const InputSelect = <ID extends number | string>({label, name, options, value, onChange}: InputSelectProps<ID>) => {

    const validation = useContext(ValidationContext);

    const handleChange = (event) => {
        onChange({
            name: name, // event.target.name
            value: event.target.value
        })
    }

    return (
        <InputContainers label={label} name={name}>
            <select name={name} value={value} onInput={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                {options.map(item =>
                    <div className="flex items-center">
                      <span
                          className='bg-green-400'
                          aria-hidden="true"
                      />
                        <option key={item.id} value={item.id}>{item.title}</option>
                    </div>
                )}
            </select>
        </InputContainers>
    )
}

export default InputSelect;
