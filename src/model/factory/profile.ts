import {ProfileInfo, ProfileModel} from "@/model/profile";
import {defaultSettingsModel} from "@/model/factory/settings";
import {defaultExerciseOptions} from "@/model/factory/exercise";

export const emptyProfileInfo = (): ProfileInfo => {
    return {
        name: "",
        avatar: "dog",
        theme: "blue"
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
        info: {name, theme: "blue", avatar: "dog"},
        exercise: defaultExerciseOptions(),
        settings: defaultSettingsModel()
    }
}
