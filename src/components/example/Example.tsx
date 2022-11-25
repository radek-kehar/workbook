import {useContext, useEffect, useRef} from "react";
import {initExampleAction, keyPressedAction, nextExampleAction, useExamples} from "../../state/examples";
import {Answer} from "../../model/examples";
import BinaryExample from "../../components/example/BinaryExample";
import {OperationType} from "../../model/generator";
import ComparisonExample from "../../components/example/ComparisonExample";
import ProgressBar from "../bar/ProgressBar";
import ResultBar from "../bar/ResultBar";
import {useNavigate} from "react-router-dom";
import {ProfileContext} from "@/components/profile/ProfileProvider";

function Example() {
    const navigate = useNavigate();

    const {generator, settings} = useContext(ProfileContext);

    const [state, dispatch] = useExamples(settings.count);

    const timer = useRef(null);

    useEffect(() => {
        dispatch(initExampleAction(generator.next()));
    }, [])

    useEffect(() => {
        const example = state.getExample();
        if (example && example.answer === Answer.CORRECT) {
            let action
            if (state.hasNext()) {
                action = () => dispatch(nextExampleAction(generator.next()));
            } else {
                action = () => navigate("/")
            }
            timer.current = setTimeout(() => action(), 3000);
            return () => {
                clearTimeout(timer.current);
            }
        }
    }, [state])

    const example = state.getExample();

    if (example === null) {
        return null; // todo: zobrazeni chyby
    }

    const handleOnKeyPressed = (value) => {
        dispatch(keyPressedAction(value));
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

    const chooseBarComponent = (continueWithError) => {
        return continueWithError
            ? <ResultBar values={state.getAnswers()}/>
            : <ProgressBar max={state.getCount()} value={state.getOrder()}/>
    }

    return (
        <div>
            {chooseBarComponent(settings.continueWithError)}
            {chooseExampleComponent(example)}
        </div>
    );
}

export default Example;
