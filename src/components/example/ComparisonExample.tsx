import Keyboard from "@/components/keyboard/Keyboard";
import {OperandLabel, OperatorLabel} from "@/components/label/Label";
import {
    Answer,
    ComparisonExample as ComparisonExampleModel,
    Example,
    KeyboardKey, SymbolKey,
    SymbolKey as SymbolKeyType
} from "@/model/examples";

type ComparisonExampleProps = {
    example: Example<ComparisonExampleModel>,
    keyPressed: (value: KeyboardKey<SymbolKey>) => void
}

const ComparisonExample = ({example, keyPressed}: ComparisonExampleProps) => {
    const operation = example.operation;

    return (
        <div className="flex flex-row justify-center items-center text-center content-center">
            <div className="grow text-8xl">
                <OperandLabel value={operation.left}/>
            </div>
            <div className="grow text-6xl">
                <Keyboard value={example.keyboard} click={keyPressed}/>
            </div>
            <div className="grow text-8xl">
                <OperandLabel value={operation.right}/>
            </div>
        </div>
    );
}

export default ComparisonExample
