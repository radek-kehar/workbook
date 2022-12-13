import {extend} from "@/themes/utils";
import base from "@/themes/base";
import {ColorPickerOption} from "@/components/form/ColorPicker";

export const orangeInputOption: ColorPickerOption = {
    id: 'orange',
    title: 'Oranžová',
    color: {
        background: 'bg-[#f97316]',
        ring: 'ring-[#f97316]',
        text: 'text-[#f97316]'
    }
}

export default extend(base, {
    textTheme: '#FFF',
    backgroundTheme: '#f97316'
});
