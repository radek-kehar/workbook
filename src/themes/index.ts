import blue, {blueInputOption} from './blue';
import pink, {pinkInputOption} from './pink';
import {IThemes} from './utils';
import {ColorPickerOption} from "@/components/form/ColorPicker";
import red, {redInputOption} from "@/themes/red";
import orange, {orangeInputOption} from "@/themes/orange";
import yellow, {yellowInputOption} from "@/themes/yellow";
import green, {greenInputOption} from "@/themes/green";
import purple, {purpleInputOption} from "@/themes/purple";
import black, {blackInputOption} from "@/themes/black";

export type ThemeType = "black" | "red" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink"  ;

export const ThemeOptionList: Record<ThemeType, ColorPickerOption> = {
    black: blackInputOption,
    red: redInputOption,
    orange: orangeInputOption,
    yellow: yellowInputOption,
    green: greenInputOption,
    blue: blueInputOption,
    purple: purpleInputOption,
    pink: pinkInputOption,
}

/**
 * The default theme to load
 */
export const DEFAULT_THEME: ThemeType = 'blue';

export const themes: IThemes = {
    black,
    red,
    orange,
    yellow,
    green,
    blue,
    purple,
    pink,
};
