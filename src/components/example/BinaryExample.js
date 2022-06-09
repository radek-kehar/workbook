import Keyboard from "components/keyboard/Keyboard";
import {OperandLabel, OperatorLabel} from "components/label/Label";
import {Icon, IconLabel} from "components/label/IconLabel";

const BinaryOperation = ({operation}) => {
    return (
        <>
            <OperandLabel value={operation.left}/>
            <OperatorLabel value={operation.operator}/>
            <OperandLabel value={operation.right}/>
            <IconLabel value={Icon.EQUALS}/>
            <OperandLabel value={operation.result}/>
        </>
    )
}

const BinaryExample = ({example, keyPressed}) => {
    return (
        <div>
            <BinaryOperation operation={example.operation}/>
            {<Keyboard value={example.keyboard} click={keyPressed}/>}
        </div>
    );
}
export default BinaryExample
