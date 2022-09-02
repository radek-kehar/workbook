import {SettingsModel} from "./settings";
import {ExerciseModel} from "./exercise";

export enum Classroom {
    PRESCHOOL,
    FIRST,
    SECOND
}

export interface ProfileInfo {
    name: string,
    classroom: Classroom
}

export interface ProfileModel {
    info: ProfileInfo,
    settings: SettingsModel,
    exercise: ExerciseModel
}
