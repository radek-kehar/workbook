import {BinaryOperation, ComparisonOperation, Example} from "./examples";

export interface GeneratorOptions {
    type: Operation,
    range: NumericRange,
    unknowns: Unknown[]
}

export enum Operation {
    COMPARE,
    ADD,
    SUB
}

export interface NumericRange {
    minDigit: number,
    maxDigit: number
}

export enum Unknown {
    OPERAND,
    OPERATOR,
    RESULT
}

export interface GenericGenerator<T extends any> {
    next(): T;
}

export interface OperationGenerator<T extends BinaryOperation | ComparisonOperation> extends GenericGenerator<T> {
}

export interface UnknownGenerator extends GenericGenerator<Unknown> {
}

export interface ExampleGenerator extends GenericGenerator<Example> {
}

export interface Generators {
    operationGenerator: OperationGenerator<BinaryOperation | ComparisonOperation>,
    unknownGenerator: UnknownGenerator,
    options: GeneratorOptions
}
