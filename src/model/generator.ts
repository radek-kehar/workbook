import {BinaryOperation, ComparisonOperation, Example} from "model/examples";

export interface GeneratorOptions {
    type: OperationType,
    range: NumericRange,
    unknowns: Unknown[]
}

export enum OperationType {
    COMPARE = "COMPARE",
    ADD = "ADD",
    SUB = "SUB"
}

export interface NumericRange {
    minDigit: number,
    maxDigit: number
}

export enum Unknown {
    OPERAND = "OPERAND",
    OPERATOR = "OPERATOR",
    RESULT = "RESULT"
}

export interface GenericGenerator<T extends any> {
    next(): T;
}

export interface OperationGenerator<T extends BinaryOperation | ComparisonOperation> extends GenericGenerator<T> {
}

export interface UnknownGenerator extends GenericGenerator<Unknown> {
}

export interface ExampleGenerator extends GenericGenerator<Example<any>> {
}

export interface Generators {
    operationGenerator: OperationGenerator<BinaryOperation | ComparisonOperation>,
    unknownGenerator: UnknownGenerator,
    options: GeneratorOptions
}
