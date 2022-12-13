import {extend} from "@/themes/utils";
import base from "@/themes/base";
import {ColorPickerOption} from "@/components/form/ColorPicker";

export const blueInputOption: ColorPickerOption = {
    id: 'blue',
    title: 'Modrá',
    color: {
        background: 'bg-[#1d4ed8]',
        ring: 'ring-[#1d4ed8]',
        text: 'text-[#1d4ed8]'
    }
}

export default extend(base, {
    textTheme: '#FFF',
    backgroundTheme: '#1d4ed8'
});
