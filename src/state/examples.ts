import {
    Answer,
    BinaryExample,
    CommandKey,
    Example,
    Examples,
    KeyboardKey,
    KeyboardType,
    KeyType,
    ShowValue,
    SymbolKey,
    ValueExample
} from "src/model/examples";
import {createContext, Dispatch} from "react";
import {Reducer, useImmerReducer} from "use-immer";
/*
 STATE
 */

const createState = (count: number): Examples => {
    const examples = Array(count).fill(null);
    return {
        actual: -1,
        examples
    }
}

/*
 GETTER
 */

export interface ExamplesGetter {
    getExample(): Example,
    getOrder(): number,
    getCount(): number,
    hasNext(): boolean
}

const createGetter = (state: Examples): ExamplesGetter => {
    return {
        getExample() {
            return state.actual >= 0 ? state.examples[state.actual] : null;
        },
        getOrder(): number {
            return state.actual + 1;
        },
        getCount(): number {
            return state.examples.length;
        },
        hasNext(): boolean {
            return this.getCount() > this.getOrder();
        }
    }
}

/*
 UTILS
 */

const isUnknown = (valueExample: BinaryExample | ValueExample<any>): ValueExample<any> => {
    if ('isUnknown' in valueExample) {
        if (valueExample.isUnknown) {
            return valueExample;
        } else {
            return null;
        }
    } else {
        return findUnknown(valueExample);
    }
}

const findUnknown = (example: BinaryExample): ValueExample<any> => {
    const left = isUnknown(example.left);
    if (left !== null) return left;
    const right = isUnknown(example.right);
    if (right !== null) return right;
    const result = isUnknown(example.result);
    if (result !== null) return result;
}

/*
 REDUCER
 */

const initExample = (draft: Examples, action: InitExampleAction) => {
    console.log('Action.InitExample')
    draft.actual = 0;
    draft.examples[draft.actual] = action.payload;
}

const nextExample = (draft: Examples, action: NextExampleAction) => {
    console.log('Action.NextExample')
    draft.actual = draft.actual + 1;
    draft.examples[draft.actual] = action.payload;
}

const evaluateEntered = (unknown: ValueExample<any>, enteredValue: number): number => {
    return unknown.entered ? Number(`${unknown.entered}${enteredValue}`) : enteredValue;
}

const removeEntered = (unknown: ValueExample<any>): number => {
    if (unknown.entered !== null) {
        const entered = unknown.entered.toString().slice(0, -1);
        return entered.length > 0 ? Number(entered) : null;
    }
    return null;
}

const evaluateAnswer = (unknown: ValueExample<any>): Answer => {
    return (unknown.value === unknown.entered) ? Answer.CORRECT : Answer.WRONG;
}

const keyPressed = (draft: Examples, action: KeyPressedAction<any>) => {
    console.log('Action.KeyPressed')
    const keyPressedAction = action as KeyPressedAction<any>;
    const enteredValue = keyPressedAction.payload.value;
    const keyboardType = draft.examples[draft.actual].keyboard.type;

    if (keyboardType === KeyboardType.AUTO_ENTER) {
        if (KeyType.NUMERIC === keyPressedAction.payload.type) {
            const item = draft.examples.find((item: Example, index: number) => draft.actual === index);
            const unknown = findUnknown(item.example);
            unknown.entered = evaluateEntered(unknown, enteredValue);
            item.answer = evaluateAnswer(unknown);
            if (item.answer === Answer.CORRECT) {
                unknown.show = ShowValue.ENTERED;
            }
            item.keyboard.keys.numeric
                .filter(key => key.value === enteredValue)
                .forEach((key) => key.disabled = true);
        }

    } else {
        if (KeyType.NUMERIC === keyPressedAction.payload.type) {
            const item = draft.examples.find((item: Example, index: number) => draft.actual === index);
            const unknown = findUnknown(item.example);
            unknown.entered = evaluateEntered(unknown, enteredValue);
            unknown.show = ShowValue.ENTERED;

        } else if (KeyType.COMMAND === keyPressedAction.payload.type) {
            if (CommandKey.BACKSPACE === keyPressedAction.payload.value) {
                const item = draft.examples.find((item: Example, index: number) => draft.actual === index);
                const unknown = findUnknown(item.example);
                unknown.entered = removeEntered(unknown);
                unknown.show = unknown.entered != null ? ShowValue.ENTERED : ShowValue.NONE;

            } else if (CommandKey.ENTER === keyPressedAction.payload.value) {
                const item = draft.examples.find((item: Example, index: number) => draft.actual === index);
                const unknown = findUnknown(item.example);
                item.answer = evaluateAnswer(unknown);
            }
        }
    }
}

const createReducer = <T extends ActionType, P extends any>(): Reducer<Examples, ExampleAction<T, P>> => {
    return (draft: Examples, action: ExampleAction<T, P>) => {
        if (action.type === ActionType.InitExample) {
            initExample(draft, action as InitExampleAction)

        } else if (action.type === ActionType.NextExample) {
            nextExample(draft, action as NextExampleAction)

        } else if (action.type === ActionType.KeyPressed) {
            keyPressed(draft, action as KeyPressedAction<any>)

        } else {
            throw new Error();
        }
    };
}

/*
 ACTIONS
 */

export enum ActionType {
    InitExample,
    NextExample,
    KeyPressed,
    EnterPressed
}

export interface ExampleAction<T extends ActionType, P extends any> {
    type: T;
    payload: P;
}

export interface InitExampleAction extends ExampleAction<ActionType.InitExample, Example> {
}

export const initExampleAction = (value: Example): InitExampleAction => ({
    type: ActionType.InitExample,
    payload: value
});

export interface NextExampleAction extends ExampleAction<ActionType.NextExample, Example> {
}

export const nextExampleAction = (value: Example): NextExampleAction => ({
    type: ActionType.NextExample,
    payload: value
});

export interface KeyPressedAction<T extends number | SymbolKey | CommandKey>
    extends ExampleAction<ActionType.KeyPressed, KeyboardKey<T>> {
}

export const keyPressedAction = (value: KeyboardKey<any>): KeyPressedAction<any> => ({
    type: ActionType.KeyPressed,
    payload: value
});

/*
 USE
 */

export const useExamples = <T extends ActionType, P extends any>(count: number): [ExamplesGetter, Dispatch<ExampleAction<T, P>>] => {
    const initState: Examples = createState(count);
    const reducer: Reducer<Examples, ExampleAction<T, P>> = createReducer();
    const [state, dispatch] = useImmerReducer(reducer, initState); // useImmerReducer
    const examplesGetter: ExamplesGetter = createGetter(state);
    return [examplesGetter, dispatch];
}

export const ExampleContext = createContext({});
