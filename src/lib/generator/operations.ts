import {BinaryOperation, Operator} from "../../model/examples";
import {genericGenerator} from "./commons";
import {GeneratorOptions, GenericGenerator, NumericRange, OperationGenerator} from "../../model/generator";

export const createGenerator = (options: GeneratorOptions): OperationGenerator => {
    switch (options.type) {
        case Operator.ADD:
            return generator(binaryOperationAddFactory(options.range));
            break;
        case Operator.SUB:
            return generator(binaryOperationSubFactory(options.range));
        default:
            throw new Error();
    }
}

const generator = (valuesFactory: () => BinaryOperation[]): OperationGenerator => {
    const generator: GenericGenerator<BinaryOperation> = genericGenerator(valuesFactory);
    const next = (): BinaryOperation => {
        return generator.next();
    }
    return {
        next
    };
}

const operationFactory = (left: number, right: number, operator: Operator): BinaryOperation => {
    const result = operator.fce(left, right)
    return {
        operator,
        left,
        right,
        result
    }
}

/**
 * Vygeneruje vsechny varianty prikladu na scitani od minDigit do maxDigit.
 */
const binaryOperationAddFactory = ({minDigit, maxDigit}: NumericRange): () => BinaryOperation[] => {
    const valuesFactory = (): BinaryOperation[] => {
        const result: BinaryOperation[] = [];
        let offset = 0;
        for (let i = minDigit; i <= maxDigit; i++) {
            for (let j = offset; j <= maxDigit; j++) {
                if ((i + j) <= maxDigit) {
                    result.push(operationFactory(i, j, Operator.ADD));
                    if (i !== j) {
                        result.push(operationFactory(j, i, Operator.ADD));
                    }
                } else {
                    break;
                }
            }
            offset++;
        }
        return result;
    }
    return valuesFactory;
}

/**
 * Vygeneruje vsechny varianty prikladu na odecitani od minDigit do maxDigit.
 */
const binaryOperationSubFactory = ({minDigit, maxDigit}: NumericRange): () => BinaryOperation[] => {
    const valuesFactory = (): BinaryOperation[] => {
        const result: BinaryOperation[] = [];
        for (let i = maxDigit; i >= minDigit; i--) {
            for (let j = 0; j <= maxDigit; j++) {
                if ((i - j) >= minDigit) {
                    result.push(operationFactory(i, j, Operator.SUB));
                } else {
                    break;
                }
            }
        }
        return result;
    }
    return valuesFactory;
}
