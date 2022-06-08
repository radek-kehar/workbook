import {BinaryOperation, ComparisonOperation, Operator} from "../../model/examples";
import {genericGenerator} from "./commons";
import {GeneratorOptions, GenericGenerator, NumericRange, OperationType, OperationGenerator} from "../../model/generator";

export const createGenerator = (options: GeneratorOptions): OperationGenerator<BinaryOperation | ComparisonOperation> => {
    switch (options.type) {
        case OperationType.COMPARE:
            return generator(comparisonOperationFactory(options.range));
        case OperationType.ADD:
            return generator(binaryOperationAddFactory(options.range));
        case OperationType.SUB:
            return generator(binaryOperationSubFactory(options.range));
        default:
            throw new Error();
    }
}

const generator = <T extends BinaryOperation | ComparisonOperation> (factory: () => T[]): OperationGenerator<T> => {
    const generator: GenericGenerator<T> = genericGenerator(factory);
    const next = (): T => {
        return generator.next();
    }
    return {
        next
    };
}

const comparisonOperationFactory = ({minDigit, maxDigit}: NumericRange): () => ComparisonOperation[] => {
    const valuesFactory = (): ComparisonOperation[] => {
        const result: ComparisonOperation[] = [];
        for (let i = minDigit; i <= maxDigit; i++) {
            for (let j = minDigit; j <= maxDigit; j++) {
                const temp = i - j;
                result.push({
                    operator: temp > 0 ? Operator.GREATER_THAN : (temp < 0 ? Operator.LESS_THAN : Operator.EQUALS),
                    left: i,
                    right: j
                })
            }
        }
        return result;
    }
    return valuesFactory;
}

class OperationFactory {
    static readonly ADD  = new OperationFactory(Operator.ADD, (l: number, r: number): number => l + r);
    static readonly SUB = new OperationFactory(Operator.SUB, (l: number, r: number): number => l - r);

    // private to disallow creating other instances of this type
    private constructor(
        private readonly operator: Operator,
        private readonly fce: (l: number, r: number) => number) {
    }

    create(left: number, right: number): BinaryOperation {
        return {
            operator: this.operator,
            left,
            right,
            result: this.fce(left, right)
        }
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
                    result.push(OperationFactory.ADD.create(i, j));
                    if (i !== j) {
                        result.push(OperationFactory.ADD.create(j, i));
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
                    result.push(OperationFactory.SUB.create(i, j));
                } else {
                    break;
                }
            }
        }
        return result;
    }
    return valuesFactory;
}
