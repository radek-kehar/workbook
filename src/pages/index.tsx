import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from "@/routes/Routes";

const Pages = () => {
    return (
        <BrowserRouter basename="workbook">
            <Routes/>
        </BrowserRouter>
    );
};

export default Pages;
