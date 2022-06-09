
export interface InputModel<T extends any, V extends any> {
    name: T,
    value: V
}

export interface InputNumberModel<T extends any> extends InputModel<T, number> {
    name: T,
    value: number
}

export interface CheckBoxDef {
    label: string
}

export interface CheckBoxModel<T extends any> extends InputModel<T, boolean> {
    name: T,
    value: boolean
}
