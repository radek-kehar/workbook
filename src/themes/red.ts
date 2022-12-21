import {extend} from "@/themes/utils";
import base from "@/themes/base";
import {ColorPickerOption} from "@/components/form/ColorPicker";

export const redInputOption: ColorPickerOption = {
    id: 'red',
    title: 'Červená',
    color: {
        background: 'bg-[#ef4444]',
        ring: 'ring-[#ef4444]',
        text: 'text-[#ef4444]'
    }
}

export default extend(base, {
    textTheme: '#FFF',
    backgroundTheme: '#ef4444'
});
