import Keyboard from "components/keyboard/Keyboard";
import {OperandLabel, OperatorLabel} from "components/label/Label";
import {Answer, ComparisonExample as ComparisonExampleModel, Example, KeyboardKey} from "model/examples";

type ComparisonExampleProps = {
    example: Example<ComparisonExampleModel>,
    keyPressed: (value: KeyboardKey<any>) => void
}

const ComparisonExample = ({example, keyPressed}: ComparisonExampleProps) => {
    const operation = example.operation;

    const operator = example.answer === Answer.CORRECT
        ? <OperatorLabel value={operation.operator}/>
        : <Keyboard value={example.keyboard} click={keyPressed}/>;

    return (
        <div>
            <OperandLabel value={operation.left}/>
            {operator}
            <OperandLabel value={operation.right}/>
        </div>
    );
}

export default ComparisonExample
