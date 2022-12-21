import React, {createContext, ReactNode, useContext, useState} from "react";
import {EmptyFormValidation, FormValidation, FormValidationBuilder, Validate} from "@/model/validation";
import {ProfileInfo} from "@/model/profile";
import {ProfileContext, ProfilesState} from "@/components/profile/ProfileProvider";

export const ValidationContext = createContext<FormValidation>(null);

export const ValidationDispatchContext = createContext<(value: any) => FormValidation>(null);

type ValidationProviderProps<T extends any> = {
    validates: Validate<T>[],
    children: ReactNode
}

export function ValidationProvider<T extends any>({validates, children}: ValidationProviderProps<T>) {
    const [validation, setValidation] = useState<FormValidation>(EmptyFormValidation);

    const validate = (value: T): FormValidation => {
        const builder = new FormValidationBuilder();
        validates.forEach(validate => {
            const isValid = validate(value);
            if (isValid !== true) {
                builder.addError(isValid);
            }
        })
        const formValidation = builder.build();
        setValidation(formValidation);
        return formValidation;
    }

    return (
        <ValidationContext.Provider value={validation}>
            <ValidationDispatchContext.Provider value={validate}>
                { children }
            </ValidationDispatchContext.Provider>
        </ValidationContext.Provider>
    )
}
