import {IconLabel} from "components/label/IconLabel";

export const NumericKey = ({value, click}) => {
    // console.log(`RENDERER: NumericKey ${value.value}`)

    const handleOnClick = (event) => {
        event.preventDefault()
        click(value)
    }

    return (
        <button type="button" disabled={value.disabled} onClick={handleOnClick}>{value.value}</button>
    )
}

export const IconKey = ({value, click}) => {
    // console.log(`RENDERER: IconKey`)

    const handleOnClick = (event) => {
        event.preventDefault()
        click(value)
    }

    return (
        <button type="button" disabled={value.disabled} onClick={handleOnClick}>
            <IconLabel type={value.type} value={value.value}/>
        </button>
    )
}
