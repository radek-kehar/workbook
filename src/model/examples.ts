import {OperationType, Unknown} from "@/model/generator";

export interface Examples {
    actual: number,
    examples: Example<any>[]
}

export interface TextProvider {
    asText(): string
}

export interface Example<T extends BinaryExample | ComparisonExample> extends TextProvider {
    type: OperationType,
    operation: T,
    keyboard: Keyboard,
    answer: Answer,
    wasWrongAnswer?: boolean
}

export interface BinaryExample extends TextProvider {
    discriminator: 'BinaryExample',
    operator: Value<Operator>,
    left: BinaryExample | Value<number>,
    right: BinaryExample | Value<number>,
    result: Value<number>
}

export interface ComparisonExample extends TextProvider {
    operator: Value<Operator>,
    left: Value<number>,
    right: Value<number>
}

export interface Value<T extends number | Operator> extends TextProvider {
    discriminator: 'Value',
    value: T,
    isUnknown: boolean,
    type?: Unknown,
    entered?: T,
    show?: ShowValue,
    answer?: Answer
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
    EQUALS, GREATER_THAN, LESS_THAN, PLUS, MINUS, COMMA
}

export enum CommandKey {
    ENTER, BACKSPACE
}

export enum KeyType {
    NUMERIC,
    SYMBOL,
    COMMAND
}

export enum KeyboardKeyStyle {
    DEFAULT = 'DEFAULT',
    POSITIVE = 'POSITIVE',
    NEGATIVE = 'NEGATIVE'
}

export interface KeyboardKey<T extends number | SymbolKey | CommandKey> {
    type: KeyType
    value: T
    disabled: boolean
    style: KeyboardKeyStyle
}

export enum Answer {
    NOT_ANSWERED = 'NOT_ANSWERED',
    CORRECT = 'CORRECT',
    WRONG = 'WRONG',
}

export interface ResultExamples {
    correct: Example<any>[],
    wrong: Example<any>[]
}
