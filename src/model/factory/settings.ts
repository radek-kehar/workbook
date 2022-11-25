import {SettingsModel} from "@/model/settings";

const emptySettingsModel = (): SettingsModel => {
    return {
        count: 0,
        continueWithError: false
    }
}

export const defaultSettingsModel = (): SettingsModel => {
    const exerciseOptions = emptySettingsModel();
    exerciseOptions.count = 7;
    exerciseOptions.continueWithError = false;
    return exerciseOptions;
}
