import {ExerciseFormModel, ExerciseModel} from "@/model/exercise";
import {OperationType, Unknown} from "@/model/generator";

const emptyExerciseOptions = (): ExerciseModel => {
    return {
        operations: [],
        range: {
            minDigit: 0,
            maxDigit: 0,
            onlyTens: false
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
            maxDigit: value.range.value.maxDigit,
            onlyTens: value.range.value.onlyTens
        },
        overbase: value.overbase.value,
        unknowns: value.unknowns.filter(item => item.value).map(item => item.name)
    }
}
