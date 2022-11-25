import {OperationType, Unknown} from "model/generator";

export interface TypeInfo<N extends any> {
    id: N,
    label: string;
}

// Example of use:
// const order = OperationType.COMPARE;
// console.log(operationTypeInfos[order].label);
export const operationTypeInfos: Record<OperationType, TypeInfo<OperationType>> = {
    [OperationType.COMPARE]: { id: OperationType.COMPARE, label: "Menší, Větší" },
    [OperationType.ADD]: { id: OperationType.ADD, label: "Sčítání" },
    [OperationType.SUB]: { id: OperationType.SUB, label: "Odčítání" },
};

// Example of use:
// const order = Unknown.OPERAND;
// console.log(unknownInfos[order].label);
export const unknownInfos: Record<Unknown, TypeInfo<Unknown>> = {
    [Unknown.OPERAND]: { id: Unknown.OPERAND, label: "Operand" },
    [Unknown.OPERATOR]: { id: Unknown.OPERATOR, label: "Znaménko" },
    [Unknown.RESULT]: { id: Unknown.RESULT, label: "Výsledek" }
};
