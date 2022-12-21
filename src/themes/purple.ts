import {extend} from "@/themes/utils";
import base from "@/themes/base";
import {ColorPickerOption} from "@/components/form/ColorPicker";

export const purpleInputOption: ColorPickerOption = {
    id: 'purple',
    title: 'Fialová',
    color: {
        background: 'bg-[#9333ea]',
        ring: 'ring-[#9333ea]',
        text: 'text-[#9333ea]'
    }
}

export default extend(base, {
    textTheme: '#FFF',
    backgroundTheme: '#9333ea'
});
