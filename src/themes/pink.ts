import {extend} from "@/themes/utils";
import base from "@/themes/base";
import {ColorPickerOption} from "@/components/form/ColorPicker";

export const pinkInputOption: ColorPickerOption = {
    id: 'pink',
    title: 'Růžová',
    color: {
        background: 'bg-[#EC4899]',
        ring: 'ring-[#EC4899]',
        text: 'text-[#EC4899]'
    }
}

export default extend(base, {
    textTheme: '#FFF',
    backgroundTheme: '#EC4899'
});
