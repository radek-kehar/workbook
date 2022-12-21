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
        <div className="flex flex-row justify-center items-center text-center content-center">
            <div className="grow text-8xl">
                {getComponent(operation.left)}
            </div>
            <div className="grow text-6xl">
                <OperatorLabel value={operation.operator}/>
            </div>
            <div className="grow text-8xl">
                {getComponent(operation.right)}
            </div>
            <div className="grow text-6xl">
                <IconLabel value={Icon.EQUALS}/>
            </div>
            <div className="grow text-8xl">
                <OperandLabel value={operation.result}/>
            </div>
        </div>
    )
}

type BinaryExampleProps = {
    example: Example<BinaryExampleModel>,
    keyPressed: (value: KeyboardKey<any>) => void
}

const BinaryExample = ({example, keyPressed}: BinaryExampleProps) => {
    return (
        <div className="flex flex-col content-center gap-y-4">
            <BinaryOperation operation={example.operation}/>
            <div className="text-6xl">
                <Keyboard value={example.keyboard} click={keyPressed}/>
            </div>
        </div>
    );
}
export default BinaryExample
