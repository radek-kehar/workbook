import {CommandKey, Example, Examples, KeyboardKey, SymbolKey} from "src/model/examples";
import {createContext, Dispatch} from "react";
import {Reducer, useImmerReducer} from "use-immer";
import {execute} from "./action/key-press-action";

//region STATE
const createState = (count: number): Examples => {
    const examples = Array(count).fill(null);
    return {
        actual: -1,
        examples
    }
}
//endregion

//region GETTER
export interface ExamplesGetter {
    getExample(): Example<any>,
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
//endregion

//region REDUCER
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

const keyPressed = (draft: Examples, action: KeyPressedAction<any>) => {
    console.log('Action.KeyPressed')
    const example = draft.examples.find((item: Example<any>, index: number) => draft.actual === index);
    const keyPressedAction = action as KeyPressedAction<any>;
    execute(example, keyPressedAction.payload);
}
//endregion

//region ACTIONS
enum ActionType {
    InitExample,
    NextExample,
    KeyPressed
}

interface ExampleAction<T extends ActionType, P extends any> {
    type: T;
    payload: P;
}

interface InitExampleAction extends ExampleAction<ActionType.InitExample, Example<any>> {
}

export const initExampleAction = (value: Example<any>): InitExampleAction => ({
    type: ActionType.InitExample,
    payload: value
});

interface NextExampleAction extends ExampleAction<ActionType.NextExample, Example<any>> {
}

export const nextExampleAction = (value: Example<any>): NextExampleAction => ({
    type: ActionType.NextExample,
    payload: value
});

interface KeyPressedAction<T extends number | SymbolKey | CommandKey>
    extends ExampleAction<ActionType.KeyPressed, KeyboardKey<T>> {
}

export const keyPressedAction = (value: KeyboardKey<any>): KeyPressedAction<any> => ({
    type: ActionType.KeyPressed,
    payload: value
});
//endregion

//region USE
export const useExamples = <T extends ActionType, P extends any>(count: number): [ExamplesGetter, Dispatch<ExampleAction<T, P>>] => {
    const initState: Examples = createState(count);
    const reducer: Reducer<Examples, ExampleAction<T, P>> = createReducer();
    const [state, dispatch] = useImmerReducer(reducer, initState); // useImmerReducer
    const examplesGetter: ExamplesGetter = createGetter(state);
    return [examplesGetter, dispatch];
}
//endregion

export const ExampleContext = createContext({});
