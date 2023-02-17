import React from "react";
import {Icon, IconLabel} from "@/components/label/IconLabel";

type ValidationErrorProps = {
    value: string | undefined
};

const ValidationError = ({value}: ValidationErrorProps) => {
    if (value === undefined) return null;

    return (
        <p className="flex items-center gap-x-2 mt-2 text-sm text-negative font-semibold">
            <IconLabel className="h-5 w-5 text-negative" value={Icon.TRIANGLE_EXCLAMATION}/>
            {value}
        </p>
    )
}

export default ValidationError;
