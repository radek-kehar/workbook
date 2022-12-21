import React, {ReactNode, useContext} from "react";
import SettingsNav from "@/components/nav/SettingsNav";
import {Link} from "react-router-dom";
import {ANNONYMOUS_PROFILE_NAME, ProfileContext, ProfilesState} from "@/components/profile/ProfileProvider";
import {Popover} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import Avatar, {AvatarSize} from "@/components/basic/Avatar";

type ExampleLayoutProps = {
    children: ReactNode
}

const ExampleLayout = ({children}: ExampleLayoutProps) => {
    return (
        <main>
            {children}
        </main>
    );
};

export default ExampleLayout;
