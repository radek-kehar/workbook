export interface InputModel<N extends any, V extends any> {
    name: N,
    value: V
}

export interface InputField<L extends any, N extends any, V extends any> extends InputModel<N, V> {
    label: L,
}
