import {Classroom, ProfileModel} from "../model/profile";
import {readLastProfileName, readProfileList, saveLastProfileName, saveProfileList} from "../lib/store/profile";
import {ProfileAlreadyExistsError, ProfileNotFoundError} from "../model/error";
import {defaultProfileModel} from "../model/factory/profile";

export const ANNONYMOUS_PROFILE_NAME = 'annonymous';

const createAnnonymousProfile = (): ProfileModel => {
    return defaultProfileModel(ANNONYMOUS_PROFILE_NAME, Classroom.FIRST);
}

export const readAllProfiles = (): ProfileModel[] => {
    const profiles = readProfileList();
    if (profiles === null) {
        return [];
    } else {
        return profiles;
    }
}

export const getLastProfile = (): ProfileModel | null => {
    const profileName = readLastProfileName();
    if (profileName) {
        const profile = readAllProfiles().find(item => item.info.name === profileName);
        if (profile) {
            return profile;
        }
    }
    return null;
}

export const getProfileByName = (profileName: string): ProfileModel | null => {
    const profile = readAllProfiles().find(item => item.info.name === profileName);
    if (profile) {
        return profile;
    }
    return null;
}

export const lastOrAnnonymousProfile = (): ProfileModel => {
    const lastProfile = getLastProfile();
    if (lastProfile) {
        return lastProfile;

    } else {
        const annonymousProfile = getProfileByName(ANNONYMOUS_PROFILE_NAME);
        if (annonymousProfile) {
            saveLastProfileName(annonymousProfile);
            return annonymousProfile;

        } else {
            const annonymousProfile = createAnnonymousProfile();
            saveProfileList([annonymousProfile]);
            saveLastProfileName(annonymousProfile);
        }
    }
}

export const changeProfileByName = (profileName: string): ProfileModel => {
    const profile = getProfileByName(profileName);
    if (profile) {
        saveLastProfileName(profile);
        return profile;
    }
    throw new ProfileNotFoundError(profileName);
}

export const addProfile = (profile: ProfileModel) => {
    const profiles = readAllProfiles();
    if (profiles.filter(item => item.info.name === profile.info.name).length > 0) {
        throw new ProfileAlreadyExistsError(profile.info.name);
    }
    profiles.push(profile);
    saveProfileList(profiles);
}

export const updateProfile = (profileName: string, profile: ProfileModel) => {
    const profiles = readAllProfiles();
    if (profiles.filter(item => item.info.name === profile.info.name && profileName !== profile.info.name).length > 0) {
        throw new ProfileAlreadyExistsError(profile.info.name);
    }
    const index = profiles.findIndex(item => item.info.name === profileName);
    if (index > -1) {
        profiles[index] = profile;
        saveProfileList(profiles);
    }
}

export const removeProfile = (profileName: string) => {
    const profiles = readAllProfiles();
    const index = profiles.findIndex(item => item.info.name === profileName);
    if (index > -1) {
        profiles.splice(index, 1);
        saveProfileList(profiles);
    }
}
