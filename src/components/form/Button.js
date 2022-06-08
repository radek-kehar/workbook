import React from "react";

const Button = ({ type, text, click }) => {

    return (
        <button type={type} onClick={click}>
            {text}
        </button>
    );
};

export default Button;
