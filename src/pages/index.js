import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "src/pages/home";
import Example from "src/pages/example";

const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path="example" element={<Example/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Pages;
