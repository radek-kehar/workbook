import {NumericRange as NumericRangeModel, NumericRange, OperationType, Unknown} from "@/model/generator";
import {InputModel} from "@/model/form";

export interface ExerciseModel {
    operations: OperationType[],
    range: NumericRange,
    unknowns: Unknown[],
    overbase: boolean
}

export interface ExerciseFormModel {
    operations: InputModel<OperationType, boolean>[],
    range: InputModel<string, NumericRangeModel>,
    overbase: InputModel<string, boolean>,
    unknowns: InputModel<Unknown, boolean>[]
}
