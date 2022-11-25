import React, {useContext} from "react";
import ProfileInfoForm from "@/components/profile/ProfileInfoForm";
import {ProfileDispatch, ProfileDispatchContext} from "@/components/profile/ProfileProvider";
import {ProfileInfo} from "@/model/profile";
import {emptyProfileInfo} from "@/model/factory/profile";
import {useNavigate} from "react-router-dom";

const ProfileCreation = () => {
    const navigate = useNavigate();
    const {dispatchProfileList} = useContext<ProfileDispatch>(ProfileDispatchContext);

    const handleOnSave = (value: ProfileInfo) => {
        dispatchProfileList.addProfile(value);
        navigate("/");
    }

    return (
        <>
            <ProfileInfoForm value={emptyProfileInfo()} onSave={handleOnSave}/>
        </>
    )
}

export default ProfileCreation;
