import {ExerciseFormModel, ExerciseModel} from "../exercise";
import {OperationType, Unknown} from "../generator";

const emptyExerciseOptions = (): ExerciseModel => {
    return {
        operations: [],
        range: {
            minDigit: 0,
            maxDigit: 0
        },
        overbase: true,
        unknowns: []
    }
}

export const defaultExerciseOptions = (): ExerciseModel => {
    const exerciseOptions = emptyExerciseOptions();
    const allOperations: OperationType[] = Object.keys(OperationType).filter(item => isNaN(Number(item))).map(item => OperationType[item])
    exerciseOptions.operations = allOperations;
    exerciseOptions.range.maxDigit = 10;
    exerciseOptions.unknowns.push(Unknown.RESULT);
    return exerciseOptions;
}

export const valueOfExerciseOptions = (value: ExerciseFormModel): ExerciseModel => {
    return {
        operations: value.operations.filter(item => item.value).map(item => item.name),
        range: {
            minDigit: value.range.value.minDigit,
            maxDigit: value.range.value.maxDigit
        },
        overbase: value.overbase.value,
        unknowns: value.unknowns.filter(item => item.value).map(item => item.name)
    }
}
