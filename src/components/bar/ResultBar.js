

function ResultBar({values, click}) {
    const handleOnClick = (event) => {
        event.preventDefault()
        if (click) {
            click(event.target.getAttribute('data-value'))
        }
    }

    const divs = []
    for (let i = 0; i < values.length; i++) {
        if (values[i] !== undefined && values[i] !== null) {
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

export default ResultBar;
