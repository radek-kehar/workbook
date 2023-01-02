import {OperationType, Unknown} from "@/model/generator";
import {Operator} from "@/model/examples";

export interface TypeInfo<N extends any> {
    id: N,
    label: string,
    description?: string
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
    [Unknown.OPERAND]: { id: Unknown.OPERAND, label: "Operand", description: "Doplň hodnotu operandu. Př.: 1 + ? = 3" },
    [Unknown.OPERATOR]: { id: Unknown.OPERATOR, label: "Znaménko", description: "Doplň znaménko. Př.: 1 ? 2 = 3" },
    [Unknown.RESULT]: { id: Unknown.RESULT, label: "Výsledek", description: "Doplň výsledek. Př.: 1 + 2 = ?" }
};

export const operatorInfos: Record<Operator, TypeInfo<Operator>> = {
    [Operator.ADD]: { id: Operator.ADD, label: "+" },
    [Operator.EQUALS]: { id: Operator.EQUALS, label: "=" },
    [Operator.LESS_THAN]: { id: Operator.LESS_THAN, label: "<" },
    [Operator.GREATER_THAN]: { id: Operator.GREATER_THAN, label: ">" },
    [Operator.SUB]: { id: Operator.SUB, label: "-" },
};
