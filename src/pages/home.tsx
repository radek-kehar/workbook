import React, {useContext} from 'react';
import ExerciseForm from "components/exercise/ExerciseForm";
import AppLayout from "../layouts/AppLayout";
import {ProfileContext, ProfilesState} from "../components/profile/ProfileProvider";
import ProfileSwitch from "../components/profile/ProfileSwitch";

const HomePage = () => {
    const {isSelectProfile} = useContext<ProfilesState>(ProfileContext);

    const component = isSelectProfile ? <ExerciseForm/> : <ProfileSwitch/>;

    return (
        <AppLayout>
            {component}
        </AppLayout>
    );
};

export default HomePage;

