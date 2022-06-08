import {useEffect, useRef} from "react";
import {initExampleAction, keyPressedAction, nextExampleAction, useExamples} from "../../state/examples";
import {Answer} from "../../model/examples";
import BinaryExample from "./BinaryExample";
import {OperationType} from "../../model/generator";
import ComparisonExample from "./ComparisonExample";

function Example({generator, count}) {
    const [getter, dispatch] = useExamples(count)

    const timer = useRef(null)

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
        return null // todo: zobrazeni chyby
    }

    const handleOnKeyPressed = (value) => {
        dispatch(keyPressedAction(value))
    }

    const chooseExampleComponent = (example) => {
        switch (example.type) {
            case OperationType.COMPARE:
                return <ComparisonExample example={example} keyPressed={handleOnKeyPressed}/>
            case OperationType.ADD:
            case OperationType.SUB:
                return <BinaryExample example={example} keyPressed={handleOnKeyPressed}/>
            default:
                return null // todo: zobrazeni chyby
        }
    }

    return (
        <div className="App">
            {/*<ProgressBar max={10} value={5}/>*/}
            {chooseExampleComponent(example)}
        </div>
    );
}

export default Example;
