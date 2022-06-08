
export interface CheckBoxDef {
    label: string
}

export interface CheckBoxModel<T extends any> {
    name: T,
    value: boolean
}
