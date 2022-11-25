import {ProfileInfo, ProfileModel} from "../profile";
import {defaultExerciseOptions} from "./exercise";
import {defaultSettingsModel} from "./settings";

export const emptyProfileInfo = (): ProfileInfo => {
    return {
        name: ""
    }
}

export const newProfileModel = (info: ProfileInfo): ProfileModel => {
    return {
        info,
        exercise: defaultExerciseOptions(),
        settings: defaultSettingsModel()
    }
}

export const defaultProfileModel = (name: string): ProfileModel => {
    return {
        info: {name},
        exercise: defaultExerciseOptions(),
        settings: defaultSettingsModel()
    }
}
