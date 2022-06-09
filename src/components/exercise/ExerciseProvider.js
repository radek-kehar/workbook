import {useExercises} from "state/exercise";
import {createContext} from "react";

export const ExerciseContext = createContext(null);

export const ExerciseDispatchContext = createContext(null);

export function ExerciseProvider({children}) {
    const [state, dispatch] = useExercises();

    return (
        <ExerciseContext.Provider value={state}>
            <ExerciseDispatchContext.Provider value={dispatch}>
                { children }
            </ExerciseDispatchContext.Provider>
        </ExerciseContext.Provider>
    )
}
