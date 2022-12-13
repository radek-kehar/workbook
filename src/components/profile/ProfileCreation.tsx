import React, {useContext} from "react";
import ProfileInfoForm from "@/components/profile/ProfileInfoForm";
import {ProfileDispatch, ProfileDispatchContext} from "@/components/profile/ProfileProvider";
import {ProfileInfo} from "@/model/profile";
import {emptyProfileInfo} from "@/model/factory/profile";
import {useNavigate} from "react-router-dom";
import PageHeader from "@/components/basic/PageHeader";

const ProfileCreation = () => {
    const navigate = useNavigate();
    const {dispatchProfileList} = useContext<ProfileDispatch>(ProfileDispatchContext);

    const handleOnSave = (value: ProfileInfo) => {
        dispatchProfileList.addProfile(value);
        navigate("/");
    }

    const handleOnCancel = () => {
        navigate("/");
    }

    return (
        <>
            <PageHeader description="Vytvoření nového uživatele" title="Nový uživatel"/>
            <ProfileInfoForm value={emptyProfileInfo()} onCancel={handleOnCancel} onSave={handleOnSave}/>
        </>
    )
}

export default ProfileCreation;
