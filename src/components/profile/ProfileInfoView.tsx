import React from "react";
import {ProfileInfo} from "@/model/profile";

type ProfileInfoViewProps = {
    value: ProfileInfo
};

const ProfileInfoView = ({value}: ProfileInfoViewProps) => {
    return (
        <>
            <div>
                <div>Jméno</div>
                <div>{value.name}</div>
            </div>
        </>
    )
}

export default ProfileInfoView;
