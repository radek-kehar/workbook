import {SettingsModel} from "@/model/settings";
import {ExerciseModel} from "@/model/exercise";

export interface ProfileInfo {
    name: string
}

export interface ProfileModel {
    info: ProfileInfo,
    settings: SettingsModel,
    exercise: ExerciseModel
}
