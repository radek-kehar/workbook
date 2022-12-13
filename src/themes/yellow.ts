import {extend} from "@/themes/utils";
import base from "@/themes/base";
import {ColorPickerOption} from "@/components/form/ColorPicker";

export const yellowInputOption: ColorPickerOption = {
    id: 'yellow',
    title: 'Žlutá',
    color: {
        background: 'bg-[#fde047]',
        ring: 'ring-[#fde047]',
        text: 'text-[#fde047]'
    }
}

export default extend(base, {
    textTheme: '#1e3a8a',
    backgroundTheme: '#fde047'
});
