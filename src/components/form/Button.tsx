import React from "react";

export type ButtonProps = {
    type: 'button',
    text: string,
    click: () => void
};

const Button = ({ type, text, click }: ButtonProps) => {

    return (
        <button type={type} onClick={click}>
            {text}
        </button>
    );
};

export default Button;
