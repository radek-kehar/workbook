import {NumericRange, OperationType, Unknown} from "./generator";

export interface ExerciseOptions {
    operations: OperationType[],
    range: NumericRange,
    unknowns: Unknown[]
}
