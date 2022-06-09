import Example from "components/example/Example";
import {createGenerator} from "service/example";
import {useContext} from "react";
import {ExerciseContext} from "components/exercise/ExerciseProvider";

export default function ExamplePage() {
    const state = useContext(ExerciseContext);
    const generator = createGenerator(state);

    return (
        <Example generator={generator} count={5}/>
    );
}
