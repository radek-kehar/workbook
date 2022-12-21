import React, {useContext, useState} from "react";
import ProfileInfoView from "@/components/profile/ProfileInfoView";
import Button, {ButtonMode} from "@/components/form/Button";
import {
    ProfileContext,
    ProfileDispatch,
    ProfileDispatchContext,
    ProfilesState
} from "@/components/profile/ProfileProvider";
import {ProfileInfo} from "@/model/profile";
import {useNavigate} from "react-router-dom";
import ToolbarContainers, {ToolbarContainersStyle} from "@/components/containers/ToolbarContainers";
import ProfileEdit from "@/components/profile/ProfileEdit";
import ConfirmationAlert, {AnswerType, useConfirmationDialog} from "@/components/modals/ConfirmationAlert";

const DeleteProfilButton = () => {
    const navigate = useNavigate();

    const {info} = useContext<ProfilesState>(ProfileContext);
    const {dispatchProfileList} = useContext<ProfileDispatch>(ProfileDispatchContext);

    const {isOpen, open, close} = useConfirmationDialog();

    const handleOnDelete = () => {
        open();
    }

    const handleOnAnswer = (answer: AnswerType) => {
        close();
        if (answer === AnswerType.YES) {
            dispatchProfileList.removeProfile(info.name);
            navigate("/");
        }
    }

    return (
        <>
            <Button mode={ButtonMode.SECONDARY} type='button' text='Smazat profil' click={handleOnDelete}/>
            <ConfirmationAlert descripton="Opravdu chcete smazat profil uživatele?" title='Smazat profil' isOpen={isOpen} onAnswer={handleOnAnswer}/>
        </>
    )
}

enum ProfileMode {
    VIEW,
    EDIT
}

type ProfileToolbarProps = {
    mode: ProfileMode,
    handleChangeMode: (mode: ProfileMode) => void
};

const ProfileToolbar = ({mode, handleChangeMode}: ProfileToolbarProps) => {
    const handleOnEdit = () => {
        handleChangeMode(ProfileMode.EDIT);
    }

    return (
        <ToolbarContainers className="mt-4" style={ToolbarContainersStyle.LEFT}>
            {mode !== ProfileMode.EDIT && <Button mode={ButtonMode.PRIMARY} type='button' text='Změnit údaje' click={handleOnEdit}/>}
            {mode !== ProfileMode.EDIT && <DeleteProfilButton/>}
        </ToolbarContainers>
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
        handleOnChangeMode(ProfileMode.VIEW);
    }

    const handleOnCancel = () => {
        handleOnChangeMode(ProfileMode.VIEW);
    }

    return (
        <>
            <div>
                {{
                    [ProfileMode.EDIT]: <ProfileEdit value={info} onCancel={handleOnCancel} onSave={handleOnSave}/>,
                    [ProfileMode.VIEW]: <ProfileInfoView value={info}/>,
                }[mode]}
            </div>
            <ProfileToolbar mode={mode} handleChangeMode={handleOnChangeMode}/>
        </>
    )
}

export default ProfileDetail;
