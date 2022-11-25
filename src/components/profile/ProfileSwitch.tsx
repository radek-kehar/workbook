import React, {useContext} from "react";
import {ProfileContext, ProfileDispatch, ProfileDispatchContext, ProfilesState} from "@/components/profile/ProfileProvider";
import {ProfileModel} from "@/model/profile";

const ProfileSwitch = () => {
    const {profileList} = useContext<ProfilesState>(ProfileContext);
    const {dispatchProfileList} = useContext<ProfileDispatch>(ProfileDispatchContext);

    const handleOnClick = (profile: ProfileModel) => {
        dispatchProfileList.switchProfile(profile.info.name);
    }

    return (
        <ul>
            {profileList.map(profile =>
                <li key={profile.info.name}>
                    <button onClick={() => handleOnClick(profile)}>{profile.info.name}</button>
                </li>
            )}
        </ul>
    )
}

export default ProfileSwitch;
