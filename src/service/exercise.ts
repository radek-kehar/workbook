import {GeneratorOptions, NumericRange} from "@/model/generator";
import {ExerciseModel} from "@/model/exercise";

const ceilToBase = (value: number): number => {
    return Math.ceil(value / 10) * 10;
}

const isOverbase = (value: NumericRange): boolean => {
    return ceilToBase(value.minDigit) !== ceilToBase(value.maxDigit)
}

const decompose = (value: NumericRange): NumericRange[] => {
    const result: NumericRange[] = []
    let minDigit = value.minDigit
    let base
    do {
        base = ceilToBase(minDigit + 1)
        result.push({minDigit: minDigit, maxDigit: base})
        minDigit = base
    } while ((value.maxDigit - minDigit) > 10)
    if (base < value.maxDigit ) {
        result.push({minDigit: base, maxDigit: value.maxDigit})
    }
    return result
}

export const generateOptions = (exercise: ExerciseModel): GeneratorOptions[] => {
    const options: GeneratorOptions[] = [];
    exercise.operations.forEach(item => {
        if (exercise.overbase === false && isOverbase(exercise.range)) {
            const ranges = decompose(exercise.range)
            ranges.forEach(range => {
                options.push({
                    type: item,
                    range: range,
                    unknowns: exercise.unknowns
                })
            })

        } else {
            options.push({
                type: item,
                range: exercise.range,
                unknowns: exercise.unknowns
            })
        }
    })
    return options;
}
