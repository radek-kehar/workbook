import {
    BinaryExample,
    BinaryOperation,
    ComparisonExample,
    ComparisonOperation,
    Operator,
    ShowValue,
    Value
} from "@/model/examples";
import {GeneratorOptions, OperationType, Unknown} from "@/model/generator";
import {getRandomInt} from "@/lib/generator/commons";
import {operatorInfos} from "@/message/enums";

export const transformOperationToExample = (options: GeneratorOptions, operation: ComparisonOperation | BinaryOperation, unknown: Unknown): ComparisonExample | BinaryExample  => {
    switch (options.type) {
        case OperationType.COMPARE:
            return transformComparisonOperationToExample(operation as ComparisonOperation);

        case OperationType.ADD:
        case OperationType.SUB:
            const example = transformBinaryOperationToExample(operation as BinaryOperation);
            let unknownValue: Value<number>;
            if (unknown === Unknown.OPERAND) {
                const exampleValues: Value<number>[] = fillBinaryOperands(example,[]);
                const random = getRandomInt(0, exampleValues.length - 1);
                unknownValue = exampleValues[random];
            } else if (unknown === Unknown.OPERATOR) {
                const exampleValues: Value<Operator>[] = fillBinaryOperators(example,[]);
                const random = getRandomInt(0, exampleValues.length - 1);
                unknownValue = exampleValues[random];
            } else { // unknown === Unknown.RESULT
                unknownValue = example.result;
            }
            unknownValue.isUnknown = true;
            unknownValue.type = unknown;
            unknownValue.show = ShowValue.NONE;
            return example;

        default:
            throw new Error();
    }
}

export const transformComparisonOperationToExample = (operation: ComparisonOperation): ComparisonExample => {
    const operator: Value<Operator> = {
        discriminator: 'Value',
        value: operation.operator,
        isUnknown: true,
        type: Unknown.OPERATOR,
        entered: null,
        show: ShowValue.NONE,
        asText(): string {
            return operatorInfos[operation.operator].label;
        }
    };
    const left: Value<number> = {
        discriminator: 'Value',
        value: operation.left,
        isUnknown: false,
        asText(): string {
            return operation.left.toString();
        }
    };
    const right: Value<number> = {
        discriminator: 'Value',
        value: operation.right,
        isUnknown: false,
        asText(): string {
            return operation.right.toString();
        }
    };

    return {
        operator,
        left,
        right,
        asText(): string {
            return `${left.asText()} ${operator.asText()} ${right.asText()}`
        }
    }
}

const fillBinaryOperands = (example: BinaryExample, exampleValues: Value<number>[]): Value<number>[] => {
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

const fillBinaryOperators = (example: BinaryExample, exampleValues: Value<Operator>[]): Value<Operator>[] => {
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
    const left: BinaryExample | Value<number> = transformOperand(operation.left);
    const right: BinaryExample | Value<number> = transformOperand(operation.right);
    const operator: Value<Operator> = {
        discriminator: 'Value',
        value: operation.operator,
        isUnknown: false,
        asText(): string {
            return operatorInfos[operation.operator].label;
        }
    };
    const result: Value<number> = {
        discriminator: 'Value',
        value: operation.result,
        isUnknown: false,
        asText(): string {
            return operation.result.toString();
        }
    }
    return {
        discriminator: 'BinaryExample',
        operator,
        left,
        right,
        result,
        asText(): string {
            return `${left.asText()} ${operator.asText()} ${right.asText()} = ${result.asText()}`
        }
    }
}

const transformOperand = (value: BinaryOperation | number): BinaryExample | Value<number> => {
    if (typeof value === 'object') {
        return transformBinaryOperationToExample(value);

    } else {
        return {
            discriminator: 'Value',
            value,
            isUnknown: false,
            asText(): string {
                return value.toString();
            }
        };
    }
}
