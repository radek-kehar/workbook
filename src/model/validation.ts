import {ProfilesState} from "@/components/profile/ProfileProvider";

export interface ErrorValidation {
    key: string;
    error: string
}

export interface Validate<T extends any> {
    (value: T): ErrorValidation | true
}

export class FormValidation {
    private readonly _errors: Map<string, string>;

    constructor(errors: Map<string, string>) {
        this._errors = errors;
    }

    isValid(): boolean {
        return this._errors.size === 0;
    }

    getError(key: string): string | undefined {
        return this._errors.get(key)
    }
}

export const EmptyFormValidation = new FormValidation(new Map<string, string>());

export class FormValidationBuilder {
    private readonly _errors: Map<string, string>;

    constructor() {
        this._errors = new Map<string, string>();
    }

    add(key: string, error: string) {
        this._errors.set(key, error);
    }

    addError(valid: ErrorValidation) {
        this.add(valid.key, valid.error);
    }

    build(): FormValidation {
        return new FormValidation(this._errors);
    }
}
