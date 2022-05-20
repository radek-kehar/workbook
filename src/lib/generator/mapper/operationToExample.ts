import {BinaryExample, BinaryOperation, ShowValue, ValueExample} from "../../../model/examples";

const transformOperand = (value: BinaryOperation | number): BinaryExample | ValueExample => {
    if (typeof value === 'object') {
        return transformOperationToExample(value);
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

export const transformOperationToExample = (operation: BinaryOperation): BinaryExample => {
    const left: BinaryExample | ValueExample = transformOperand(operation.left);
    const right: BinaryExample | ValueExample = transformOperand(operation.right);
    const result: ValueExample = {
        value: operation.result,
        entered: null,
        isUnknown: false,
        show: ShowValue.VALUE
    }
    return {
        operator: operation.operator,
        left,
        right,
        result
    }
}
