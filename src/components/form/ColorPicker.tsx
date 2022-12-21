import React from "react";
import {InputModel} from "@/model/form";
import {RadioGroup} from "@headlessui/react";
import {classNames} from "@/lib/utils";
import {ThemeType} from "@/themes";

export interface ColorPickerOption {
    id: ThemeType,
    title: string,
    color: {
        background: string,
        ring: string,
        text: string
    }
}

type ColorPickerProps = {
    label: string,
    options: ColorPickerOption[],
    onChange: (event: InputModel<string, ThemeType>) => void
} & InputModel<string, ThemeType>;

const ColorPicker = ({ label, name, options, value, onChange }: ColorPickerProps) => {

    const handleChange = (event) => {
        onChange({
            name: name,
            value: event
        })
    };

    return (
        <RadioGroup value={value} onChange={handleChange}>
            <RadioGroup.Label className="block text-sm font-medium text-gray-700">{label}</RadioGroup.Label>
            <div className="mt-4 flex flex-wrap items-center gap-3">
                {options.map((option) => (
                    <RadioGroup.Option
                        key={option.id}
                        value={option.id}
                        className={({ active, checked }) =>
                            classNames(
                                option.color.ring,
                                active && checked ? 'ring ring-offset-1' : '',
                                !active && checked ? 'ring-2' : '',
                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                            )
                        }
                    >
                        <RadioGroup.Label as="span" className="sr-only">
                            {option.title}
                        </RadioGroup.Label>
                        <span
                            aria-hidden="true"
                            className={classNames(option.color.background, 'h-8 w-8 border border-black border-opacity-10 rounded-full')}
                        />
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
};

export default ColorPicker;
