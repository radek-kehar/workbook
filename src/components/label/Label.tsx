import {Operator, ShowValue, Value} from "model/examples";
import {OperatorIconLabel} from "components/label/IconLabel";

type NumericLabelProps = {
    value: number
}

const NumericLabel = ({value}: NumericLabelProps) => {
    return (
        <span>{value}</span>
    )
}

const UnknownLabel = () => {
    return (
        <span>?</span>
    )
}

type OperandLabelProps = {
    value: Value<number>
}

export const OperandLabel = ({value}: OperandLabelProps) => {
    const label = value.isUnknown && value.show === ShowValue.NONE
        ? <UnknownLabel/>
        : <NumericLabel value={value.show === ShowValue.ENTERED ? value.entered : value.value}/>;

    return (
        label
    )
}

type OperatorLabelProps = {
    value: Value<Operator>
}

export const OperatorLabel = ({value}: OperatorLabelProps) => {
    const label = value.isUnknown && value.show === ShowValue.NONE
        ? <UnknownLabel/>
        : <OperatorIconLabel value={value.value}/>;

    return (
        label
    )
}
