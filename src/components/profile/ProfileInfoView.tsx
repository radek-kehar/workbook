import React from "react";
import {ProfileInfo} from "@/model/profile";
import Avatar, {AvatarSize} from "@/components/basic/Avatar";
import PageHeader from "@/components/basic/PageHeader";

type ProfileInfoViewProps = {
    value: ProfileInfo
};

const ProfileInfoView = ({value}: ProfileInfoViewProps) => {
    return (
        <>
            <PageHeader description="Profil aktuálního uživatele" title="Můj profil"/>
            <div className="flex flex-row items-center">
                <Avatar profile={value} size={AvatarSize.LARGE}/>
                <div className="text-4xl text-theme-background ml-4">
                    {value.name}
                </div>
            </div>
        </>
    )
}

export default ProfileInfoView;
