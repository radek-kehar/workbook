import {createContext, useEffect, useState} from "react";
import {ProfileInfo, ProfileModel} from "@/model/profile";
import {ProfileAlreadyExistsError, ProfileNotFoundError} from "@/model/error";
import {SettingsModel} from "@/model/settings";
import {ExerciseModel} from "@/model/exercise";
import {createGenerator} from "@/service/example";
import {ExampleGenerator} from "@/model/generator";
import {defaultProfileModel, newProfileModel} from "@/model/factory/profile";
import {readLastProfileName, readProfileList, saveLastProfileName, saveProfileList} from "@/lib/store/profile";

export const ANNONYMOUS_PROFILE_NAME = 'annonymous';

export interface ProfileState extends ProfileModel {
    generator?: ExampleGenerator
}

interface ProfileList {
    profileList: ProfileState[],
    activeProfile: number,
    isSelectProfile: boolean
}

export interface ProfilesState extends ProfileState {
    profileList: ProfileState[],
    isSelectProfile: boolean
}

export const ProfileContext = createContext<ProfilesState>(null);

interface SetterDispatch<T extends any> {
    set(T): void
}

interface ProfileModelDispatch {
    dispatchInfo: SetterDispatch<ProfileInfo>,
    dispatchSettings: SetterDispatch<SettingsModel>,
    dispatchExercise: SetterDispatch<ExerciseModel>
}

interface ProfileListDispatch {
    switchProfile: (profileName: string) => void
    addProfile: (profile: ProfileInfo) => void
    removeProfile: (profileName: string) => void
}

export interface ProfileDispatch extends ProfileModelDispatch {
    dispatchProfileList: ProfileListDispatch
}

export const ProfileDispatchContext = createContext<ProfileDispatch>(null);

const getProfileIdxByName = (profileName: string, profileList: ProfileModel[]): number => {
    return profileList.findIndex(item => item.info.name === profileName);
}

const createProfileState = (value: ProfileModel): ProfileState => {
    const generator = createGenerator(value.exercise);

    return {
        info: value.info,
        exercise: value.exercise,
        settings: value.settings,
        generator
    }
}

const initProfileList = (profileModelList: ProfileModel[], activeProfileName: string): ProfileList => {
    if (profileModelList) {
        if (profileModelList.length === 1) {
            const profilModel = profileModelList[0];
            const profileState = createProfileState(profilModel);
            return {
                profileList: [profileState],
                activeProfile: 0,
                isSelectProfile: true
            }

        }

        if (profileModelList.length > 1) {
            const activeProfileIdx: number = profileModelList.findIndex(item => item.info.name === activeProfileName);
            const profileList = profileModelList.map((item, index) => {
                if (index === activeProfileIdx) {
                    return createProfileState(item);
                } else {
                    return item;
                }
            });
            return {
                profileList,
                activeProfile: activeProfileIdx,
                isSelectProfile: false
            }
        }
    }

    const anonymousProfileModel = defaultProfileModel(ANNONYMOUS_PROFILE_NAME);
    const anonymousProfileState = createProfileState(anonymousProfileModel);
    return {
        profileList: [anonymousProfileState],
        activeProfile: 0,
        isSelectProfile: true
    }
}

export function ProfileProvider({children}) {
    const [profileListState, setProfileListState] = useState<ProfileList>(
        initProfileList(readProfileList(), readLastProfileName())
    );

    useEffect(() => {
        saveProfileList(profileListState.profileList);
        if (profileListState.isSelectProfile) {
            saveLastProfileName(profileListState.profileList[profileListState.activeProfile]);
        }
    }, [profileListState])

    const activeProfil = profileListState.activeProfile > -1 ? profileListState.activeProfile : 0;
    const value: ProfilesState = {
        info: profileListState.profileList[activeProfil].info,
        settings: profileListState.profileList[activeProfil].settings,
        exercise: profileListState.profileList[activeProfil].exercise,
        profileList: profileListState.profileList,
        isSelectProfile: profileListState.isSelectProfile
    }

    const switchProfile = (profileName: string) => {
        const profileIdx = getProfileIdxByName(profileName, profileListState.profileList);
        if (profileIdx > -1) {
            const updatedProfileList = profileListState.profileList.map((item, index) => {
                if (index === profileIdx) {
                    return createProfileState(item);
                } else {
                    return item;
                }
            });
            setProfileListState({
                profileList: updatedProfileList,
                activeProfile: profileIdx,
                isSelectProfile: true
            });
        } else {
            throw new ProfileNotFoundError(profileName);
        }
    }

    const addProfile = (info: ProfileInfo) => {
        const profileIdx = getProfileIdxByName(info.name, profileListState.profileList);
        if (profileIdx > -1) {
            throw new ProfileAlreadyExistsError(info.name);
        } else {
            const updatedProfileList = [
                ...profileListState.profileList,
                newProfileModel(info)
            ];
            setProfileListState({
                ...profileListState,
                profileList: updatedProfileList
            });
        }
    }

    const removeProfile = (profileName: string) => {
        const profileIdx = getProfileIdxByName(profileName, profileListState.profileList);
        if (profileIdx > -1) {
            const updatedProfileList = profileListState.profileList.filter(
                (item, index) => index !== profileIdx);
            if (profileListState.activeProfile === profileIdx) { // smazal jsem aktivni profil
                setProfileListState(initProfileList(updatedProfileList, null));

            } else { // smazal jsem jiny nez aktivni profil
                const updatedProfileIdx = getProfileIdxByName(profileName, updatedProfileList);
                setProfileListState({
                    ...profileListState,
                    profileList: updatedProfileList,
                    activeProfile: updatedProfileIdx
                });
            }
        }
    }

    const dispatchProfileList: ProfileListDispatch = {switchProfile, addProfile, removeProfile};

    const setInfo = (info: ProfileInfo) => {
        const updatedProfileList = profileListState.profileList.map((item, index) => {
            if (index === profileListState.activeProfile) {
                return {...item, info};
            } else {
                return item;
            }
        });
        setProfileListState({...profileListState, profileList: updatedProfileList});
    }
    const dispatchInfo: SetterDispatch<ProfileInfo> = {set: setInfo};

    const setExercise = (exercise: ExerciseModel) => {
        const updatedProfileList = profileListState.profileList.map((item, index) => {
            if (index === profileListState.activeProfile) {
                return {...item, exercise, generator: createGenerator(exercise)};
            } else {
                return item;
            }
        });
        setProfileListState({...profileListState, profileList: updatedProfileList});
    }
    const dispatchExercise: SetterDispatch<ExerciseModel> = {set: setExercise};

    const setSettings = (settings: SettingsModel) => {
        const updatedProfileList = profileListState.profileList.map((item, index) => {
            if (index === profileListState.activeProfile) {
                return {...item, settings};
            } else {
                return item;
            }
        });
        setProfileListState({...profileListState, profileList: updatedProfileList});
    }
    const dispatchSettings: SetterDispatch<SettingsModel> = {set: setSettings};

    const dispatch: ProfileDispatch = {dispatchProfileList, dispatchInfo, dispatchExercise, dispatchSettings};

    return (
        <ProfileContext.Provider value={value}>
            <ProfileDispatchContext.Provider value={dispatch}>
                { children }
            </ProfileDispatchContext.Provider>
        </ProfileContext.Provider>
    )
}
