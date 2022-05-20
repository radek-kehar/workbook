import Label from "../label/Label";
import {Icon, IconLabel} from "../label/IconLabel";

const BinaryOperation = ({left, operator, right}) => {

    return (
        <>
            <Label value={left}/>
            <IconLabel type={'operator'} value={operator}/>
            <Label value={right}/>
        </>
    )
}

export default function Operation({operation}) {

    return (
        <>
            <BinaryOperation {...operation}/>
            <IconLabel value={Icon.EQUALS}/>
            <Label value={operation.result}/>
        </>
    )
}
