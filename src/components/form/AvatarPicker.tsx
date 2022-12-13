import React from "react";
import {InputModel, InputOption} from "@/model/form";
import {RadioGroup} from "@headlessui/react";
import {classNames} from "@/lib/utils";
import {AvatarType} from "@/model/profile";

type AvatarPickerProps = {
    label: string,
    options: InputOption<AvatarType>[],
    onChange: (event: InputModel<string, AvatarType>) => void
} & InputModel<string, AvatarType>;

const AvatarPicker = ({ label, name, options, value, onChange }: AvatarPickerProps) => {

    const handleChange = (event) => {
        onChange({
            name: name,
            value: event
        })
    };

    return (
        <RadioGroup value={value} onChange={handleChange}>
            <RadioGroup.Label className="block text-sm font-medium text-gray-700">{label}</RadioGroup.Label>
            <div className="mt-4 flex flex-wrap items-center gap-4">
                {options.map((option) => (
                    <RadioGroup.Option
                        key={option.id}
                        value={option.id}
                        className={({ active, checked }) =>
                            classNames(
                                active && checked ? 'ring ring-offset-1' : '',
                                !active && checked ? 'ring-2' : '',
                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                            )
                        }
                    >
                        <RadioGroup.Label as="span" className="sr-only">
                            {option.title}
                        </RadioGroup.Label>
                        <img
                            className="inline-block h-8 w-8 "
                            src={`/public/avatar/${option.id}.png`}
                            alt={option.title}
                        />
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
};

export default AvatarPicker;
