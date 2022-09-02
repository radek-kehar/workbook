import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from "routes/Routes";

const Pages = () => {
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    );
};

export default Pages;
