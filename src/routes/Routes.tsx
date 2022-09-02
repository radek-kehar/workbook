import {Route, Routes as Switch, useNavigate} from "react-router-dom";
import React from "react";
import Home from "pages/home";
import Example from "pages/example";
import ProfileInfoForm from "../components/profile/ProfileInfoForm";
import Profile from "../pages/profile";
import Settings from "../pages/settings";

const Routes = () => {
    return (
        <Switch>
            <Route index element={<Home/>}/>
            <Route path="example" element={<Example/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="settings" element={<Settings/>}/>
        </Switch>
    );
}

export default Routes;
