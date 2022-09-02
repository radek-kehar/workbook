import {Classroom, ProfileInfo, ProfileModel} from "../profile";
import {defaultExerciseOptions} from "./exercise";
import {defaultSettingsModel} from "./settings";

export const emptyProfileInfo = (): ProfileInfo => {
    return {
        name: "",
        classroom: null
    }
}

export const defaultProfileModel = (name: string, classroom: Classroom): ProfileModel => {
    return {
        info: {name, classroom},
        exercise: defaultExerciseOptions(),
        settings: defaultSettingsModel()
    }
}
