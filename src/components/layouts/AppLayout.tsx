import React, {ReactNode, useContext} from "react";
import SettingsNav from "@/components/nav/SettingsNav";
import {Link} from "react-router-dom";
import {ANNONYMOUS_PROFILE_NAME, ProfileContext, ProfilesState} from "@/components/profile/ProfileProvider";
import {Popover} from "@headlessui/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import Avatar, {AvatarSize} from "@/components/basic/Avatar";

const Title = () => {
    return (
        <Link to="/" className="text-2xl text-theme-text">Početnice</Link>
    )
}

type TitleContainerProps = {
    children: ReactNode
}
const TitleContainer = ({children}: TitleContainerProps) => {
    return (
        <div className="flex flex-row justify-between items-center w-screen p-4 pb-2 bg-theme-background">
            {children}
        </div>
    )
}

const Header = () => {
    const {info} = useContext<ProfilesState>(ProfileContext);

    return (
        <Popover className="relative">
            <TitleContainer>
                <Title/>
                <div className="flex flex-row justify-between items-center md:relative">
                    {info.name !== ANNONYMOUS_PROFILE_NAME &&
                        <div className="mr-4">
                            <Link to="/profile/detail">
                                <Avatar profile={info} size={AvatarSize.SMALL}/>
                            </Link>
                        </div>
                    }
                    <Popover.Button>
                        <span className="sr-only">Otevřít menu</span>
                        <Bars3Icon className="h-6 w-6 text-theme-text" aria-hidden="true"/>
                    </Popover.Button>
                    <Popover.Panel className="absolute top-0 md:top-10 left-0 md:left-auto md:right-0 z-10 w-screen md:w-auto h-screen md:h-auto bg-white">
                        <div className="md:hidden">
                            <TitleContainer>
                                <Title/>
                                <Popover.Button>
                                    <span className="sr-only">Zavřít menu</span>
                                    <XMarkIcon className="h-6 w-6 text-theme-text" aria-hidden="true" />
                                </Popover.Button>
                            </TitleContainer>
                        </div>
                        <div className="pl-4 pr-4 text-theme-text bg-theme-background md:border-r md:rounded md:shadow md:w-60">
                            <SettingsNav/>
                        </div>
                    </Popover.Panel>
                </div>
            </TitleContainer>
        </Popover>
    )
}

type AppLayoutProps = {
    children: ReactNode
}

const AppLayout = ({children}: AppLayoutProps) => {
    return (
        <div>
            <header>
                <Header/>
            </header>
            <main className="p-4 pt-2">
                {children}
            </main>
        </div>
    );
};

export default AppLayout;
