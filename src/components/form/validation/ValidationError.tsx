import React from "react";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";

type ValidationErrorProps = {
    value: string | undefined
};

const ValidationError = ({value}: ValidationErrorProps) => {
    if (value === undefined) return null;

    return (
        <p className="flex items-center gap-x-2 mt-2 text-sm text-negative font-semibold">
            <ExclamationTriangleIcon className="h-5 w-5 text-negative"/>
            {value}
        </p>
    )
}

export default ValidationError;
