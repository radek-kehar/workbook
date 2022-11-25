import React, {ReactNode, useContext} from "react";
import SettingsNav from "@/components/nav/SettingsNav";
import {Link} from "react-router-dom";
import {ProfileContext, ProfilesState} from "@/components/profile/ProfileProvider";

type AppLayoutProps = {
    children: ReactNode
}

const AppLayout = ({children}: AppLayoutProps) => {
    const {info} = useContext<ProfilesState>(ProfileContext);

    return (
        <div>
            <header>
                <h1><Link to="/">Početnice</Link></h1>
                <div>{info.name}</div>
                <SettingsNav/>
            </header>
            <hr/>
            <main>
                {children}
            </main>
        </div>
    );
};

export default AppLayout;
