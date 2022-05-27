import {
    BinaryExample,
    BinaryOperation,
    ComparisonExample,
    ComparisonOperation, Operator,
    ShowValue,
    ValueExample
} from "../../../model/examples";
import {GeneratorOptions, Operation, Unknown} from "../../../model/generator";
import {getRandomInt} from "../commons";

export const transformOperationToExample = (options: GeneratorOptions, operation: ComparisonOperation | BinaryOperation, unknown: Unknown): ComparisonExample | BinaryExample  => {
    switch (options.type) {
        case Operation.COMPARE:
            return transformComparisonOperationToExample(operation as ComparisonOperation);

        case Operation.ADD:
        case Operation.SUB:
            const example = transformBinaryOperationToExample(operation as BinaryOperation);
            let unknownValue: ValueExample<number>;
            if (unknown === Unknown.OPERAND) {
                const exampleValues: ValueExample<number>[] = fillBinaryOperands(example,[]);
                const random = getRandomInt(0, exampleValues.length - 1);
                unknownValue = exampleValues[random];
            } else if (unknown === Unknown.OPERATOR) {
                const exampleValues: ValueExample<Operator>[] = fillBinaryOperators(example,[]);
                const random = getRandomInt(0, exampleValues.length - 1);
                unknownValue = exampleValues[random];
            } else { // unknown === Unknown.RESULT
                unknownValue = example.result;
            }
            unknownValue.isUnknown = true;
            unknownValue.show = ShowValue.NONE;
            return example;

        default:
            throw new Error();
    }
}

export const transformComparisonOperationToExample = (operation: ComparisonOperation): ComparisonExample => {
    return {
        operator: {
            value: operation.operator,
            entered: null,
            isUnknown: false,
            show: ShowValue.VALUE
        },
        left: operation.left,
        right: operation.right
    }
}

const fillBinaryOperands = (example: BinaryExample, exampleValues: ValueExample<number>[]): ValueExample<number>[] => {
    if ('isUnknown' in example.left) {
        exampleValues.push(example.left);
    } else {
        return fillBinaryOperands(example.left, exampleValues);
    }
    if ('isUnknown' in example.right) {
        exampleValues.push(example.right);
    } else {
        return fillBinaryOperands(example.right, exampleValues);
    }
    return exampleValues;
}

const fillBinaryOperators = (example: BinaryExample, exampleValues: ValueExample<Operator>[]): ValueExample<Operator>[] => {
    if (!('isUnknown' in example.left)) {
        return fillBinaryOperators(example.left, exampleValues);
    }
    if (!('isUnknown' in example.right)) {
        return fillBinaryOperators(example.right, exampleValues);
    }
    if ('isUnknown' in example.operator) {
        exampleValues.push(example.operator)
    }
    return exampleValues;
}

export const transformBinaryOperationToExample = (operation: BinaryOperation): BinaryExample => {
    const left: BinaryExample | ValueExample<number> = transformOperand(operation.left);
    const right: BinaryExample | ValueExample<number> = transformOperand(operation.right);
    const result: ValueExample<number> = {
        value: operation.result,
        entered: null,
        isUnknown: false,
        show: ShowValue.VALUE
    }
    return {
        operator: {
            value: operation.operator,
            entered: null,
            isUnknown: false,
            show: ShowValue.VALUE
        },
        left,
        right,
        result
    }
}

const transformOperand = (value: BinaryOperation | number): BinaryExample | ValueExample<number> => {
    if (typeof value === 'object') {
        return transformBinaryOperationToExample(value);

    } else {
        const result = {
            value,
            entered: null,
            isUnknown: false,
            show: ShowValue.VALUE
        };
        return result;
    }
}
