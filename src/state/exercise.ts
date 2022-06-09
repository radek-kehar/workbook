import {NumericRange, OperationType, Unknown} from "../model/generator";
import {Reducer, useImmerReducer} from "use-immer";
import {Dispatch} from "react";
import {ExerciseOptions} from "model/exercise";
import {CheckBoxModel} from "model/form";
import {loadExercise} from "lib/store/exercise";

//region STATE
const emptyState = (): ExerciseOptions => {
    return {
        operations: [],
        range: {
            minDigit: 0,
            maxDigit: 10
        },
        unknowns: []
    }
}

const initState = (): ExerciseOptions => {
    const value = loadExercise();
    return value !== null ? value : emptyState();
}
//endregion

//region REDUCER
const createReducer = <T extends ActionType, P extends any>(): Reducer<ExerciseOptions, ExerciseAction<T, P>> => {
    return (draft: ExerciseOptions, action: ExerciseAction<T, P>) => {
        if (action.type === ActionType.SetOperation) {
            addOrRemoveItem(draft.operations, action as SetOperationAction);

        } else if (action.type === ActionType.SetRange) {
            const payload: NumericRange = (action as SetRangeAction).payload;
            draft.range.minDigit = payload.minDigit;
            draft.range.maxDigit = payload.maxDigit;

        } else if (action.type === ActionType.SetUnknown) {
            addOrRemoveItem(draft.unknowns, action as SetUnknownAction);

        } else if (action.type === ActionType.Reset) {
            const empty = emptyState()
            draft.operations = empty.operations
            draft.range = empty.range
            draft.unknowns = empty.unknowns

        } else {
            throw new Error();
        }
    };
}

const addOrRemoveItem = <T extends any, A extends ExerciseAction<any, CheckBoxModel<T>>>(values: T[], action: A) => {
    const payload: CheckBoxModel<T> = action.payload;
    if (payload.value) {
        values.push(payload.name)
    } else {
        removeItem(values, payload.name)
    }
}

const removeItem = <T>(arr: Array<T>, value: T): Array<T> => {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
//endregion

//region ACTIONS
enum ActionType {
    SetOperation,
    SetRange,
    SetUnknown,
    Reset
}

interface ExerciseAction<T extends ActionType, P extends any> {
    type: T;
    payload: P;
}

interface SetOperationAction extends ExerciseAction<ActionType.SetOperation, CheckBoxModel<OperationType>> {
}
export const setOperationAction = (value: CheckBoxModel<OperationType>): SetOperationAction => ({
    type: ActionType.SetOperation,
    payload: value
});

interface SetRangeAction extends ExerciseAction<ActionType.SetRange, NumericRange> {
}
export const setRangeAction = (value: NumericRange): SetRangeAction => ({
    type: ActionType.SetRange,
    payload: value
});

interface SetUnknownAction extends ExerciseAction<ActionType.SetUnknown, CheckBoxModel<Unknown>> {
}
export const setUnknownAction = (value: CheckBoxModel<Unknown>): SetUnknownAction => ({
    type: ActionType.SetUnknown,
    payload: value
});

interface ResetAction extends ExerciseAction<ActionType.Reset, void> {
}
export const resetAction = (): ResetAction => ({
    type: ActionType.Reset,
    payload: null
});
//endregion

//region USE
export const useExercises = <T extends ActionType, P extends any>(): [ExerciseOptions, Dispatch<ExerciseAction<T, P>>] => {
    const reducer: Reducer<ExerciseOptions, ExerciseAction<T, P>> = createReducer();
    const [state, dispatch] = useImmerReducer(reducer, initState()); // useImmerReducer
    return [state, dispatch];
}
//endregion
