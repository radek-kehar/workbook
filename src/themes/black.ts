import {extend} from "@/themes/utils";
import base from "@/themes/base";
import {ColorPickerOption} from "@/components/form/ColorPicker";

export const blackInputOption: ColorPickerOption = {
    id: 'black',
    title: 'Černá',
    color: {
        background: 'bg-[#111827]',
        ring: 'ring-[#111827]',
        text: 'text-[#111827]'
    }
}

export default extend(base, {
    textTheme: '#FFF',
    backgroundTheme: '#111827'
});
