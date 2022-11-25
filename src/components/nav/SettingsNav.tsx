import React, {useContext} from "react";
import {
    ANNONYMOUS_PROFILE_NAME,
    ProfileContext,
    ProfileDispatch,
    ProfileDispatchContext,
    ProfilesState
} from "@/components/profile/ProfileProvider";
import {Link} from "react-router-dom";
import {ProfileModel} from "@/model/profile";

const SettingsNav = () => {
    const {info, profileList} = useContext<ProfilesState>(ProfileContext);
    const {dispatchProfileList} = useContext<ProfileDispatch>(ProfileDispatchContext);

    const handleOnClick = (profile: ProfileModel) => {
        dispatchProfileList.switchProfile(profile.info.name);
    }

    const profileListFiltered = profileList.filter(item => item.info.name !== info.name);

    return (
        <nav>
            <ul>
                <li>
                    {info.name}
                </li>
                <li>
                    <Link to="/profile/detail">Můj profil</Link>
                </li>
                <li>
                    <Link to="/settings">Moje nastavení</Link>
                </li>
                {profileListFiltered.map(profile =>
                    <li key={profile.info.name}>
                        <button onClick={() => handleOnClick(profile)}>{profile.info.name}</button>
                    </li>
                )}
                <li hidden={info.name === ANNONYMOUS_PROFILE_NAME}>
                    <Link to="/profile/creation">Nový profil</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SettingsNav;
