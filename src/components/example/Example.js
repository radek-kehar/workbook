import {useEffect, useRef} from "react";
import {initExampleAction, keyPressedAction, nextExampleAction, useExamples} from "../../state/examples";
import Keyboard from "../keyboard/Keyboard";
import {Answer} from "../../model/examples";
import Operation from "../operation/Operation";

function Example({generator, count}) {
    const [getter, dispatch] = useExamples(count)

    const timer = useRef(null)

    const handleOnClick = (value) => {
        dispatch(keyPressedAction(value))
    }

    useEffect(() => {
        dispatch(initExampleAction(generator.next()))
    }, [])

    useEffect(() => {
        const example = getter.getExample()
        if (example && example.answer === Answer.CORRECT) {
            if (getter.hasNext()) {
                timer.current = setTimeout(() => dispatch(nextExampleAction(generator.next())), 3000)
                return () => {
                    clearTimeout(timer.current)
                }
            } else {
                console.log('TODO KONEC')
            }
        }
    }, [getter])

    const example = getter.getExample()

    if (example === null) {
        return null
    }

    return (
        <div className="App">
            {/*<ProgressBar max={10} value={5}/>*/}
            <Operation operation={example.example}/>
            {<Keyboard value={example.keyboard} click={handleOnClick}/>}
        </div>
    );
}

export default Example;
