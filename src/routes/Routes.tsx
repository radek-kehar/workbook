import {Route, Routes as Switch} from "react-router-dom";
import React from "react";
import HomePage from "pages/home";
import ExamplePage from "pages/example";
import SettingsPage from "../pages/settings";
import ProfileDetailPage from "../pages/profile/detail";
import ProfileCreationPage from "../pages/profile/creation";

const Routes = () => {
    return (
        <Switch>
            <Route index element={<HomePage/>}/>
            <Route path="example" element={<ExamplePage/>}/>
            <Route path="profile/detail" element={<ProfileDetailPage/>}/>
            <Route path="profile/creation" element={<ProfileCreationPage/>}/>
            <Route path="settings" element={<SettingsPage/>}/>
        </Switch>
    );
}

export default Routes;
