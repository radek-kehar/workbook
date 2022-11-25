import {SettingsModel} from "./settings";
import {ExerciseModel} from "./exercise";

export interface ProfileInfo {
    name: string
}

export interface ProfileModel {
    info: ProfileInfo,
    settings: SettingsModel,
    exercise: ExerciseModel
}
