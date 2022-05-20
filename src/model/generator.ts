import {BinaryOperation, Example, Operator, Unknown} from "./examples";

export interface GeneratorOptions {
    type: Operator,
    range: NumericRange,
    unknowns: Unknown[]
}

export interface NumericRange {
    minDigit: number,
    maxDigit: number
}

export interface GenericGenerator<T extends any> {
    next(): T;
}

export interface OperationGenerator extends GenericGenerator<BinaryOperation> {
}

export interface UnknownGenerator extends GenericGenerator<Unknown> {
}

export interface ExampleGenerator extends GenericGenerator<Example> {
}

export interface Generators {
    operationGenerator: OperationGenerator,
    unknownGenerator: UnknownGenerator,
    options: GeneratorOptions
}
