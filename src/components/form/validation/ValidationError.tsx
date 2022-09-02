import React from "react";

type ValidationErrorProps = {
    value: string | undefined
};

const ValidationError = ({value}: ValidationErrorProps) => {
    if (value === undefined) return null;

    return (
        <div>
            {value}
        </div>
    )
}

export default ValidationError;
