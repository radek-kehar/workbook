
export interface Examples {
    actual: number,
    examples: Example[]
}

export interface Example {
    example: BinaryExample | ComparisonExample,
    keyboard: Keyboard,
    answer: Answer
}

export interface BinaryExample {
    operator: ValueExample<Operator>,
    left: BinaryExample | ValueExample<number>,
    right: BinaryExample | ValueExample<number>,
    result: ValueExample<number>
}

export interface ComparisonExample {
    operator: ValueExample<Operator>,
    left: number,
    right: number
}

export interface ValueExample<T> {
    value: T,
    entered?: T,
    isUnknown: boolean,
    show: ShowValue
}

export enum ShowValue {
    NONE,
    VALUE,
    ENTERED
}

export interface BinaryOperation {
    operator: Operator,
    left: BinaryOperation | number,
    right: BinaryOperation | number,
    result: number
}

export interface ComparisonOperation {
    operator: Operator,
    left: number,
    right: number
}

export enum Operator {
    EQUALS, GREATER_THAN, LESS_THAN, ADD, SUB
}

export interface Keyboard {
    type: KeyboardType,
    keys: {
        numeric: KeyboardKey<number>[],
        symbol: KeyboardKey<SymbolKey>[],
        command: KeyboardKey<CommandKey>[]
    }
}

export enum KeyboardType {
    AUTO_ENTER,
    CONFIRM_BY_ENTER
}

export enum SymbolKey {
    EQUALS, GREATER_THAN, LESS_THAN, MINUS, COMMA
}

export enum CommandKey {
    ENTER, BACKSPACE
}

export enum KeyType {
    NUMERIC,
    SYMBOL,
    COMMAND
}

export interface KeyboardKey<T extends number | SymbolKey | CommandKey> {
    type: KeyType
    value: T
    disabled: boolean
}

export enum Answer {
    NOT_ANSWERED,
    CORRECT,
    WRONG,
}
