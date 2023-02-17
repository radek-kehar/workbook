import Keyboard, {KeyboardProps} from "@/components/keyboard/Keyboard";
import {OperandLabel, OperandLabelProps} from "@/components/label/Label";
import {ComparisonExample as ComparisonExampleModel, Example, KeyboardKey, SymbolKey} from "@/model/examples";
import {ExampleHelp} from "@/components/example/ExampleHelp";
import {Icon, IconLabel} from "@/components/label/IconLabel";

type ComparisonExampleProps = {
    example: Example<ComparisonExampleModel>,
    keyPressed: (value: KeyboardKey<SymbolKey>) => void
}

const OperandLabelContainer = ({value}: OperandLabelProps) => {
    return (
        <div className="grow text-6xl sm:text-8xl">
            <OperandLabel value={value}/>
        </div>
    )
}

const KeyboardContainer = ({value, click}: KeyboardProps) => {
    return (
        <div className="text-4xl sm:text-6xl">
            <Keyboard value={value} click={click}/>
        </div>
    )
}

const ExampleToSolve = ({example, keyPressed}: ComparisonExampleProps) => {
    const operation = example.operation;

    return (
        <div className="flex flex-row justify-center items-center text-center content-center">
            <OperandLabelContainer value={operation.left}/>
            <KeyboardContainer value={example.keyboard} click={keyPressed}/>
            <OperandLabelContainer value={operation.right}/>
        </div>
    );
}

const OperandItemsContainer3Cols = ({value}: OperandLabelProps) => {
    return (
        <div className="basis-1/2 text-4xl sm:text-6xl ">
            <div className="grid grid-cols-3 gap-1 justify-center justify-items-center">
                {[...Array(value.value)].map((e, i) =>
                    <IconLabel key={i} value={Icon.APPLE}/>
                )}
            </div>
        </div>
    )
}

const OperandItemsContainer10Rows = ({value}: OperandLabelProps) => {
    return (
        <div className="basis-1/2 text-sm sm:text-base">
            <div className="grid grid-rows-11 grid-flow-col gap-1 justify-center justify-items-center place-items-center">
                <span></span>
                {[...Array(10)].map((e, i) =>
                    <span className="text-gray-200">{i + 1}</span>)}
                {[...Array(value.value)].map((e, i) => {
                    let header = null
                    if (i % 10 === 0) {
                        if ((i + 10) > value.value) {
                            header = <span/>
                        } else {
                            header = <span className="text-gray-300">{(i / 10) + 1}</span>
                        }
                    }
                    return (
                        <>
                            {header}
                            <IconLabel key={i} value={Icon.APPLE}/>
                        </>
                    )
                })}
            </div>
        </div>
    )
}

const Explanation = ({example, keyPressed}: ComparisonExampleProps) => {
    const greaterThen10 = (example.operation.left.value > 10 || example.operation.right.value > 10);
    const OperandItemsContainer = greaterThen10 ? OperandItemsContainer10Rows : OperandItemsContainer3Cols;

    return (
        <div className={`flex flex-row justify-center ${greaterThen10 ? 'items-start' : 'items-baseline'}`}>
            <OperandItemsContainer value={example.operation.left}/>
            <div className="self-center"><KeyboardContainer value={example.keyboard} click={keyPressed}/></div>
            <OperandItemsContainer value={example.operation.right}/>
        </div>
    )
}

const ComparisonExample = ({example, keyPressed}: ComparisonExampleProps) => {
    return (example.operation.left.value > 100 || example.operation.right.value > 100)
        ?
        <ExampleToSolve example={example} keyPressed={keyPressed}/>
        :
        <ExampleHelp
            example={<ExampleToSolve example={example} keyPressed={keyPressed}/>}
            help={<Explanation example={example} keyPressed={keyPressed}/>}
        />;
}

export default ComparisonExample
