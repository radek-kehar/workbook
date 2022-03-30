
function ProgressBar({value, max, click}) {
    const handleOnClick = (event) => {
        event.preventDefault()
        if (click) {
            click(event.target.getAttribute('data-value'))
        }
    }

    const percentage = 100 * (value / max)

    const divs = []
    for (let i = 0; i < max; i++) {
        if (i < value) {
            divs.push(<div key={i} data-value={i} onClick={handleOnClick}></div>)
        } else {
            divs.push(<div key={i} data-value={i}></div>)
        }
    }

    return (
        <div>
            {divs}
        </div>
    )
}

export default ProgressBar;
