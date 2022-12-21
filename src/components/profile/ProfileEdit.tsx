import React from "react";
import ProfileInfoForm, {ProfileInfoFormProps} from "@/components/profile/ProfileInfoForm";
import PageHeader from "@/components/basic/PageHeader";

const ProfileEdit = (props: ProfileInfoFormProps) => {
    return (
        <>
            <PageHeader description="Úprava existujícího uživatele" title="Úprava uživatele"/>
            <ProfileInfoForm {...props}/>
        </>
    )
}

export default ProfileEdit;
