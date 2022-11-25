import React, {useContext, useState} from "react";
import ProfileInfoView from "./ProfileInfoView";
import ProfileInfoForm from "./ProfileInfoForm";
import Button from "../form/Button";
import {ProfileContext, ProfileDispatch, ProfileDispatchContext, ProfilesState} from "./ProfileProvider";
import {ProfileInfo} from "../../model/profile";
import {useNavigate} from "react-router-dom";

enum ProfileMode {
    VIEW,
    EDIT
}

type ProfileToolbarProps = {
    mode: ProfileMode,
    handleChangeMode: (mode: ProfileMode) => void
};

const ProfileToolbar = ({mode, handleChangeMode}: ProfileToolbarProps) => {
    const navigate = useNavigate();

    const {info} = useContext<ProfilesState>(ProfileContext);
    const {dispatchProfileList} = useContext<ProfileDispatch>(ProfileDispatchContext);

    const handleOnEdit = () => {
        handleChangeMode(ProfileMode.EDIT);
    }

    const handleOnDelete = () => {
        dispatchProfileList.removeProfile(info.name);
        navigate("/");
    }

    return (
        <div>
            {mode !== ProfileMode.EDIT && <Button type='button' text='Změnit údaje' click={handleOnEdit}/>}
            <Button type='button' text='Smazat profil' click={handleOnDelete}/>
        </div>
    )
}

const ProfileDetail = () => {
    const navigate = useNavigate();

    const [mode, setMode] = useState(ProfileMode.VIEW);

    const {info} = useContext<ProfilesState>(ProfileContext);
    const {dispatchInfo} = useContext<ProfileDispatch>(ProfileDispatchContext);

    const handleOnChangeMode = (mode: ProfileMode) => {
        setMode(mode);
    }

    const handleOnSave = (value: ProfileInfo) => {
        dispatchInfo.set(value);
        navigate("/");
    }

    return (
        <>
            <div>
                {{
                    [ProfileMode.EDIT]: <ProfileInfoForm value={info} onSave={handleOnSave}/>,
                    [ProfileMode.VIEW]: <ProfileInfoView value={info}/>,
                }[mode]}
            </div>
            <div>
                <ProfileToolbar mode={mode} handleChangeMode={handleOnChangeMode}/>
            </div>
        </>
    )
}

export default ProfileDetail;
