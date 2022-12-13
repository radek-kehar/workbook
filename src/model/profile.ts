import {SettingsModel} from "@/model/settings";
import {ExerciseModel} from "@/model/exercise";
import {ThemeType} from "@/themes";
import {InputOption} from "@/model/form";

export type AvatarType = "cat" | "dog" | "dolphin" | "elephant" | "fish" | "hedgehog" | "horse" | "lion" | "monkey" | "owl" | "panda-bear" | "parrot" | "pig" | "rabbit" | "sheep" | "squirrel";

export const AvatarOptionList: Record<AvatarType, InputOption<AvatarType>> = {
    cat: {id: "cat", title: "Kočka"},
    dog: {id: "dog", title: "Pes"},
    dolphin: {id: "dolphin", title: "Delfín"},
    elephant: {id: "elephant", title: "Slon"},
    fish: {id: "fish", title: "Ryba"},
    hedgehog: {id: "hedgehog", title: "Ježek"},
    horse: {id: "horse", title: "Kůň"},
    lion: {id: "lion", title: "Lev"},
    monkey: {id: "monkey", title: "Opice"},
    owl: {id: "owl", title: "Sova"},
    ['panda-bear']: {id: "panda-bear", title: "Panda"},
    parrot: {id: "parrot", title: "Papoušek"},
    pig: {id: "pig", title: "Prase"},
    rabbit: {id: "rabbit", title: "Zajíc"},
    sheep: {id: "sheep", title: "Ovce"},
    squirrel: {id: "squirrel", title: "Veverka"},
}

export interface ProfileInfo {
    name: string,
    avatar: AvatarType,
    theme: ThemeType
}

export interface ProfileModel {
    info: ProfileInfo,
    settings: SettingsModel,
    exercise: ExerciseModel
}
