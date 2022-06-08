import {ExerciseOptions} from "../model/exercise";
import {GeneratorOptions, OperationType} from "../model/generator";

export const generateOptions = (exercise: ExerciseOptions): GeneratorOptions[] => {
    const options: GeneratorOptions[] = [];
    exercise.operations.forEach(item => {
        options.push({
            type: item,
            range: exercise.range,
            unknowns: exercise.unknowns
        })
    })
    return options;
}
