
export interface Examples {
    actual: number,
    examples: Example[]
}

export interface Example {
    example: BinaryExample,
    keyboard: Keyboard,
    answer: Answer
}

export interface BinaryOperation {
    operator: Operator,
    left: BinaryOperation | number,
    right: BinaryOperation | number,
    result: number
}

export interface BinaryExample {
    operator: Operator,
    left: BinaryExample | ValueExample,
    right: BinaryExample | ValueExample,
    result: ValueExample
}
export enum ShowValue {
    NONE,
    VALUE,
    ENTERED
}

export interface ValueExample {
    value: number,
    entered?: number,
    isUnknown: boolean,
    show: ShowValue
}

export class Operator {
    static readonly ADD  = new Operator('ADD', '+', (l: number, r: number) => l + r);
    static readonly SUB = new Operator('SUB', '-',(l: number, r: number) => l - r);

    // private to disallow creating other instances of this type
    private constructor(
        private readonly key: string,
        public readonly symbol: string,
        public readonly fce: (l: number, r: number) => number) {
    }

    toString() {
        return this.key;
    }
}

export enum Unknown {
    OPERAND,
    OPERATOR,
    RESULT
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
    ENTER,
    BACKSPACE
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
