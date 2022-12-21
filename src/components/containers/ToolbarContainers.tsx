import React, {ReactNode} from "react";
import {classNames} from "@/lib/utils";

export enum ToolbarContainersStyle {
    LEFT,
    RIGHT
}

type ToolbarContainersProps = {
    className?: string,
    style?: ToolbarContainersStyle,
    children: ReactNode
}

const ToolbarContainers = ({className, style = ToolbarContainersStyle.RIGHT, children}: ToolbarContainersProps) => {
    const justify = style === ToolbarContainersStyle.RIGHT ? 'justify-end' : 'justify-start';

    return (
        <div className={className}>
            <div className={classNames(justify, "flex flex-row gap-x-4")}>
                {children}
            </div>
        </div>
    );
};

export default ToolbarContainers;
