import {createContext, useState} from "react";
import {ProfileModel} from "../../model/profile";
import {
    addProfile,
    changeProfileByName,
    lastOrAnnonymousProfile,
    removeProfile,
    updateProfile
} from "../../service/profile";
import {ProfileAlreadyExistsError, ProfileNotFoundError} from "../../model/error";
import {SettingsModel} from "../../model/settings";
import {ExerciseModel} from "../../model/exercise";
import {createGenerator} from "../../service/example";
import {ExampleGenerator} from "../../model/generator";
import {isSameObject} from "../../lib/utils";

interface ProfileState extends ProfileModel {
    generator: ExampleGenerator
}

export const ProfileContext = createContext<ProfileState>(null);

interface ProfileInfoDispatch {
    change: (profileName: string) => void
    add: (profile: ProfileModel) => void
    update: (profileName: string, profile: ProfileModel) => void
    remove: (profileName: string) => void
}

interface SetterDispatch<T extends any> {
    set(T): void
}

interface ProfileDispatch {
    dispatchInfo: ProfileInfoDispatch,
    dispatchSettings: SetterDispatch<SettingsModel>,
    dispatchExercise: SetterDispatch<ExerciseModel>
}

export const ProfileDispatchContext = createContext<ProfileDispatch>(null);

const createProfileState = (profile: ProfileModel): ProfileState => {
    const generator = createGenerator(profile.exercise);

    return {
        info: profile.info,
        exercise: profile.exercise,
        settings: profile.settings,
        generator: generator
    }
}

export function ProfileProvider({children}) {
    const [value, setValue] = useState<ProfileState>(createProfileState(lastOrAnnonymousProfile()));

    const change = (profileName: string) => {
        try {
            const profile = changeProfileByName(profileName);
            setValue(createProfileState(profile));
        } catch (error) {
            if (error instanceof ProfileNotFoundError) {
                // todo: chyba - profil neexistuje
                console.error(error);
            } else {
                throw error
            }
        }
    }

    const add = (profile: ProfileModel) => {
        try {
            addProfile(profile);
        } catch (error) {
            if (error instanceof ProfileAlreadyExistsError) {
                // todo: profil s danym jmenem jiz existuje
                console.error(error);
            } else {
                throw error
            }
        }
    }

    const update = (profileName: string, profile: ProfileModel) => {
        try {
            updateProfile(profileName, profile);
        } catch (error) {
            if (error instanceof ProfileAlreadyExistsError) {
                // todo: profil s danym jmenem jiz existuje
                console.error(error);
            } else {
                throw error
            }
        }
    }

    const remove = (profileName: string) => {
        removeProfile(profileName);
    }

    const dispatchInfo: ProfileInfoDispatch = {change, add, update, remove};

    const setExercise = (exercise: ExerciseModel) => {
        if (!isSameObject(exercise, value.exercise)) {
            const updatedProfile = {...value, exercise};
            updateProfile(value.info.name, updatedProfile);
            setValue(createProfileState(updatedProfile));
        }
    }

    const dispatchExercise: SetterDispatch<ExerciseModel> = {set: setExercise};

    const setSettings = (settings: SettingsModel) => {
        if (!isSameObject(settings, value.settings)) {
            const updatedProfile = {...value, settings};
            updateProfile(value.info.name, updatedProfile);
            setValue(createProfileState(updatedProfile));
        }
    }

    const dispatchSettings: SetterDispatch<SettingsModel> = {set: setSettings};

    const dispatch: ProfileDispatch = {dispatchInfo, dispatchExercise, dispatchSettings};

    return (
        <ProfileContext.Provider value={value}>
            <ProfileDispatchContext.Provider value={dispatch}>
                { children }
            </ProfileDispatchContext.Provider>
        </ProfileContext.Provider>
    )
}
