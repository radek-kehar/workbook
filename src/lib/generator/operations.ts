import {BinaryOperation, ComparisonOperation, Operator} from "@/model/examples";
import {genericGenerator} from "@/lib/generator/commons";
import {GeneratorOptions, GenericGenerator, NumericRange, OperationGenerator, OperationType} from "@/model/generator";

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

const incFceFactory = (onlyTens: boolean) => onlyTens ? (val) => val + 10 : (val) => val + 1;

const decFceFactory = (onlyTens: boolean) => onlyTens ? (val) => val - 10 : (val) => val - 1;

const minDigitFceFactory = (onlyTens: boolean, value: number) => onlyTens ? Math.ceil(value / 10) * 10 : value;

const maxDigitFceFactory = (onlyTens: boolean, value: number) => onlyTens ? Math.floor(value / 10) * 10 : value;

const comparisonOperationFactory = ({minDigit, maxDigit, onlyTens}: NumericRange): () => ComparisonOperation[] => {
    const valuesFactory = (): ComparisonOperation[] => {
        const result: ComparisonOperation[] = [];
        const incFce = incFceFactory(onlyTens);
        const tempMinDigit = minDigitFceFactory(onlyTens, minDigit);
        for (let i = tempMinDigit; i <= maxDigit; i = incFce(i)) {
            for (let j = tempMinDigit; j <= maxDigit; j = incFce(j)) {
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
const binaryOperationAddFactory = ({minDigit, maxDigit, onlyTens}: NumericRange): () => BinaryOperation[] => {
    const valuesFactory = (): BinaryOperation[] => {
        const result: BinaryOperation[] = [];
        const incFce = incFceFactory(onlyTens);
        const tempMinDigit = minDigitFceFactory(onlyTens, minDigit);
        let offset = tempMinDigit;
        for (let i = tempMinDigit; i <= maxDigit; i = incFce(i)) {
            for (let j = offset; j <= maxDigit; j = incFce(j)) {
                if ((i + j) <= maxDigit) {
                    result.push(OperationFactory.ADD.create(i, j));
                    if (i !== j) {
                        result.push(OperationFactory.ADD.create(j, i));
                    }
                } else {
                    break;
                }
            }
            offset = incFce(offset);
        }
        return result;
    }
    return valuesFactory;
}

/**
 * Vygeneruje vsechny varianty prikladu na odecitani od minDigit do maxDigit.
 */
const binaryOperationSubFactory = ({minDigit, maxDigit, onlyTens}: NumericRange): () => BinaryOperation[] => {
    const valuesFactory = (): BinaryOperation[] => {
        const result: BinaryOperation[] = [];
        const incFce = incFceFactory(onlyTens);
        const decFce = decFceFactory(onlyTens);
        const tempMaxDigit = maxDigitFceFactory(onlyTens, maxDigit);
        const tempMinDigit = minDigitFceFactory(onlyTens, minDigit);
        for (let i = tempMaxDigit; i >= tempMinDigit; i = decFce(i)) {
            for (let j = tempMinDigit; j <= tempMaxDigit; j = incFce(j)) {
                if ((i - j) >= tempMinDigit) {
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
