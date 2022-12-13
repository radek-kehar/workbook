import React from "react";
import {classNames} from "@/lib/utils";

export enum ButtonMode {
    PRIMARY,
    SECONDARY,
    THEMATHIC
}

export type ButtonProps = {
    mode: ButtonMode,
    type?: 'button',
    text: string,
    click: () => void
};

const Button = ({ mode, text, type = 'button', click }: ButtonProps) => {

    let className
    if (mode === ButtonMode.PRIMARY) {
        className = "text-primary bg-white";
    } else if (mode === ButtonMode.SECONDARY) {
        className = "text-secondary bg-white";
    } else if (mode === ButtonMode.THEMATHIC) {
        className = "text-theme-text bg-theme-background";
    } else {
        className = "text-gray-700 bg-white"
    }

    return (
        <button type={type} onClick={click} className={classNames(className, "inline-flex items-center rounded border border-gray-300 px-2.5 py-1.5 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2")}>
            {text}
        </button>
    );
};

export default Button;
