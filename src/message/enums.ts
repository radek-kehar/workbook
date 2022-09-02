import {OperationType, Unknown} from "model/generator";

export interface TypeInfo {
    label: string;
}

// Example of use:
// const order = OperationType.COMPARE;
// console.log(operationTypeInfos[order].label);
export const operationTypeInfos: Record<OperationType, TypeInfo> = {
    [OperationType.COMPARE]: { label: "Menší, Větší" },
    [OperationType.ADD]: { label: "Sčítání" },
    [OperationType.SUB]: { label: "Odčítání" },
};

// Example of use:
// const order = Unknown.OPERAND;
// console.log(unknownInfos[order].label);
export const unknownInfos: Record<Unknown, TypeInfo> = {
    [Unknown.OPERAND]: { label: "Operand" },
    [Unknown.OPERATOR]: { label: "Znaménko" },
    [Unknown.RESULT]: { label: "Výsledek" }
};
