import {OperandLabel, OperatorLabel} from "@/components/label/Label";
import {Icon, IconLabel} from "@/components/label/IconLabel";
import {BinaryExample as BinaryExampleModel, Example, KeyboardKey, Value} from "@/model/examples"
import Keyboard from "@/components/keyboard/Keyboard";

const getComponent = (value: BinaryExampleModel | Value<number>) => {
    return value.discriminator === 'Value'
        ? <OperandLabel value={value}/>
        : <BinaryOperand value={value}/>
}

type BinaryOperandProps = {
    value: BinaryExampleModel
}

const BinaryOperand = ({value}: BinaryOperandProps) => {
    return (
        <>
            {getComponent(value.left)}
            <OperatorLabel value={value.operator}/>
            {getComponent(value.right)}
        </>
    )
}

type BinaryOperationProps = {
    operation: BinaryExampleModel
}

const BinaryOperation = ({operation}: BinaryOperationProps) => {
    return (
        <>
            {getComponent(operation.left)}
            <OperatorLabel value={operation.operator}/>
            {getComponent(operation.right)}
            <IconLabel value={Icon.EQUALS}/>
            <OperandLabel value={operation.result}/>
        </>
    )
}

type BinaryExampleProps = {
    example: Example<BinaryExampleModel>,
    keyPressed: (value: KeyboardKey<any>) => void
}

const BinaryExample = ({example, keyPressed}: BinaryExampleProps) => {
    return (
        <div>
            <BinaryOperation operation={example.operation}/>
            {<Keyboard value={example.keyboard} click={keyPressed}/>}
        </div>
    );
}
export default BinaryExample
