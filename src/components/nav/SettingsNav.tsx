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
import Avatar, {AvatarSize} from "@/components/basic/Avatar";

const SettingsNav = () => {
    const {info, profileList} = useContext<ProfilesState>(ProfileContext);
    const {dispatchProfileList} = useContext<ProfileDispatch>(ProfileDispatchContext);

    const handleOnClick = (profile: ProfileModel) => {
        dispatchProfileList.switchProfile(profile.info.name);
    }

    const profileListFiltered = profileList.filter(item => item.info.name !== info.name);

    const existsAnnonymous = info.name === ANNONYMOUS_PROFILE_NAME;

    return (
        <nav>
            <ul className="flex flex-col justify-between">
                <li className="pt-2 font-bold">
                    Aktuální uživatel: {info.name}
                </li>
                <li className="pt-2">
                    <Link to="/profile/detail">Můj profil</Link>
                </li>
                <li className={`pt-2 pb-2 border-b`}>
                    <Link to="/settings">Moje nastavení</Link>
                </li>
                {profileListFiltered.map((profile, i, {length}) =>
                    <li key={profile.info.name} className={`pt-2 ${length - 1 === i ? 'border-b pb-2' : ''}`}>
                        <div className="flex flex-row justify-start items-center cursor-pointer"
                             onClick={() => handleOnClick(profile)}>
                            <div className="mr-2"><Avatar profile={profile.info} size={AvatarSize.SMALL}/></div>
                            <span>{profile.info.name}</span>
                        </div>
                    </li>
                )}
                <li hidden={existsAnnonymous} className="pt-2 pb-2 border-b">
                    <Link to="/profile/creation">Nový profil</Link>
                </li>
                <li className="pt-2 pb-2">
                    <Link to="/about">O aplikaci</Link>
                </li>
            </ul>
        </nav>
    )
}

export default SettingsNav;
