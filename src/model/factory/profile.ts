import {ProfileInfo, ProfileModel} from "@/model/profile";
import {defaultSettingsModel} from "@/model/factory/settings";
import {defaultExerciseOptions} from "@/model/factory/exercise";

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
