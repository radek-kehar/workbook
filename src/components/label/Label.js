import {ShowValue} from "../../model/examples";
import {IconLabel} from "./IconLabel";

const NumericLabel = ({value}) => {
    return (
        <span>{value}</span>
    )
}

const UnknownLabel = () => {
    return (
        <span>?</span>
    )
}

export const OperandLabel = ({value}) => {
    const label = value.isUnknown && value.show === ShowValue.NONE
        ? <UnknownLabel/>
        : <NumericLabel value={value.show === ShowValue.ENTERED ? value.entered : value.value}/>;

    return (
        label
    )
}

export const OperatorLabel = ({value}) => {
    const label = value.isUnknown && value.show === ShowValue.NONE
        ? <UnknownLabel/>
        : <IconLabel type={'operator'} value={value.value}/>;

    return (
        label
    )
}
