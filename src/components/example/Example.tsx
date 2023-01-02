import React, {useContext, useEffect, useRef} from "react";
import {
    goToExampleAction,
    initExampleAction,
    keyPressedAction,
    nextExampleAction,
    useExamples
} from "../../state/examples";
import {Answer} from "../../model/examples";
import BinaryExample from "../../components/example/BinaryExample";
import {OperationType} from "../../model/generator";
import ComparisonExample from "../../components/example/ComparisonExample";
import ProgressBar from "../bar/ProgressBar";
import ResultBar from "../bar/ResultBar";
import {useNavigate} from "react-router-dom";
import {ProfileContext} from "@/components/profile/ProfileProvider";
import ExampleLayout from "@/components/layouts/ExampleLayout";
import {XMarkIcon} from "@heroicons/react/24/solid";
import ConfirmationAlert, {AnswerType, useConfirmationDialog} from "@/components/modals/ConfirmationAlert";
import OkModal, {useOkModal} from "@/components/modals/OkModal";
import {defaultExerciseOptions} from "@/model/factory/exercise";
import ExampleResult from "@/components/result/ExampleResult";

function Example() {
    const navigate = useNavigate();

    const {generator, settings} = useContext(ProfileContext);

    const [state, dispatch] = useExamples(settings.count);

    const {isOpen: isOpenFinishDialog, open: openFinishDialog, close: closeFinishDialog} = useOkModal();

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
                openFinishDialog();
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

    const handleOnClose = () => {
        navigate("/");
    }

    const handleOnFinish = () => {
        closeFinishDialog();
        navigate("/");
    }

    const handleOnGoToExample = (example: number) => {
        dispatch(goToExampleAction(example));
    }

    const chooseBarComponent = (continueWithError) => {
        return continueWithError
            ? <ResultBar values={state.getAnswers()} click={handleOnGoToExample}/>
            : <ProgressBar max={state.getCount()} value={state.getOrder()}/>
    }

    return (
        <ExampleLayout>
            <XMarkIcon className="absolute top-0 right-0 z-10 h-6 w-6 bg-white cursor-pointer" aria-hidden="true" onClick={handleOnClose}/>
            {chooseBarComponent(settings.continueWithError)}
            <div className="p-4 pt-2">
                {chooseExampleComponent(example)}
            </div>
            <OkModal title='Výsledek' isOpen={isOpenFinishDialog} onClose={handleOnFinish}>
                <ExampleResult value={state.getResult()}/>
            </OkModal>
        </ExampleLayout>
    );
}

export default Example;
