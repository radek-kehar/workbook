import {NumericRange, OperationType, Unknown} from "model/generator";

export interface ExerciseOptions {
    operations: OperationType[],
    range: NumericRange,
    unknowns: Unknown[],
    overbase: boolean
}
