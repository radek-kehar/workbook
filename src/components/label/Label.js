import {ShowValue} from "../../model/examples";

const NumericLabel = ({value}) => {
    return (
        <span>{value}</span>
    )
}

const UnknownLabel = () => {
    return (
        <span>_</span>
    )
}

export default function Label({value}) {
    return value.isUnknown && value.show === ShowValue.NONE
        ? <UnknownLabel/>
        : <NumericLabel value={value.show === ShowValue.ENTERED ? value.entered : value.value}/>
}
