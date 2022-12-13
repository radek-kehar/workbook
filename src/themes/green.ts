import {extend} from "@/themes/utils";
import base from "@/themes/base";
import {ColorPickerOption} from "@/components/form/ColorPicker";

export const greenInputOption: ColorPickerOption = {
    id: 'green',
    title: 'Zelená',
    color: {
        background: 'bg-[#16a34a]',
        ring: 'ring-[#16a34a]',
        text: 'text-[#16a34a]'
    }
}

export default extend(base, {
    textTheme: '#FFF',
    backgroundTheme: '#16a34a'
});
