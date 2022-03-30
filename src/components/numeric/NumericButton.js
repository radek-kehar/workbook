
function NumericButton({number, click}) {
    const handleOnClick = (event) => {
        event.preventDefault()
        click(number)
    }

    return (
        <button type="button" onClick={handleOnClick}>{number}</button>
    )
}

export default NumericButton;
