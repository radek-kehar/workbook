import React, {useContext} from "react";
import {
    ProfileContext,
    ProfileDispatch,
    ProfileDispatchContext,
    ProfilesState
} from "@/components/profile/ProfileProvider";
import {ProfileInfo, ProfileModel} from "@/model/profile";
import PageHeader from "@/components/basic/PageHeader";
import {ThemeOptionList} from "@/themes";
import Avatar, {AvatarSize} from "@/components/basic/Avatar";
import {classNames} from "@/lib/utils";

const getTheme = (profile: ProfileInfo) => {
    return ThemeOptionList[profile.theme].color;
}

const ProfileSwitch = () => {
    const {profileList} = useContext<ProfilesState>(ProfileContext);
    const {dispatchProfileList} = useContext<ProfileDispatch>(ProfileDispatchContext);

    const handleOnClick = (profile: ProfileModel) => {
        dispatchProfileList.switchProfile(profile.info.name);
    }

    return (
        <>
            <PageHeader description="Začni výběrem uživatele" title="Vyber uživatele"/>
            <div className="mt-10">
                <ul className="flex flex-wrap justify-center gap-y-10">
                    {profileList.map(profile =>
                        <li key={profile.info.name} className="w-full sm:w-1/2">
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col items-center cursor-pointer border-2 rounded-lg p-4" onClick={() => handleOnClick(profile)}>
                                    <Avatar profile={profile.info} size={AvatarSize.LARGE}/>
                                    <span className={classNames(getTheme(profile.info).text, 'font-semibold')}>{profile.info.name}</span>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default ProfileSwitch;
