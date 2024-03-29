import {ProfileModel} from "@/model/profile";
import {LocalStorage, SessionStorage} from "@/lib/store/session-storage";

const STORAGE_KEY_PROFILE_LIST = 'profile.list';

export const saveProfileList = (value: ProfileModel[]): void => {
    LocalStorage.setStorage<ProfileModel[]>(STORAGE_KEY_PROFILE_LIST, value);
}

export const readProfileList = (): ProfileModel[] | null => {
    return LocalStorage.getStorage<ProfileModel[]>(STORAGE_KEY_PROFILE_LIST);
}

const STORAGE_KEY_PROFILE_LAST = 'profile.last';

export const saveLastProfileName = (value: ProfileModel): void => {
    SessionStorage.setStorage<string>(STORAGE_KEY_PROFILE_LAST, value.info.name);
}

export const readLastProfileName = (): string | null => {
    return SessionStorage.getStorage<string>(STORAGE_KEY_PROFILE_LAST);
}
