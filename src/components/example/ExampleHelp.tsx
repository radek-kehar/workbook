import React, {useState} from "react";
import {Icon, IconCircle} from "@/components/label/IconLabel";

type ButtonProps = {
    click: () => void
}

type ExampleHelpProps = {
    example: JSX.Element,
    help: JSX.Element
}

export const ExampleHelp = ({example, help}: ExampleHelpProps) => {
    const [isShowHelp, setIsShowHelp] = useState(false);

    const showHelp = () => {
        setIsShowHelp(true);
    }

    const closeHelp = () => {
        setIsShowHelp(false);
    }

    return (
        <>
            {isShowHelp ? help : example}
            <div className="absolute bottom-5 right-5 z-10 cursor-pointer animate-pulse hover:animate-none">
                {isShowHelp
                    ? <IconCircle className="text-theme-background" value={Icon.ROTATE_LEFT} onClick={closeHelp}/>
                    : <IconCircle className="text-theme-background" value={Icon.LIGHTBULB} onClick={showHelp}/>
                }
            </div>
        </>
    )
}
