import Button, {ButtonMode} from "@/components/form/Button";
import React, {useState} from "react";
import {ArrowUturnLeftIcon, LightBulbIcon, XMarkIcon} from "@heroicons/react/24/outline";

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
            <div className="absolute bottom-5 right-5 z-10 h-10 w-10 cursor-pointer text-theme-text bg-theme-background rounded-full p-1 hover:ring-2 hover:ring-theme-background hover:ring-offset-2">
                {isShowHelp
                    ? <ArrowUturnLeftIcon aria-hidden="true" onClick={closeHelp}/>
                    : <LightBulbIcon aria-hidden="true" onClick={showHelp}/>
                }
            </div>
        </>
    )
}
