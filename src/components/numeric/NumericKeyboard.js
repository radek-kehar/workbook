import NumericButton from "./NumericButton";

/**
 key = pocet cisel na klavesnici
 value = rozlozeni klavesnice; napr. [4,3] znamena prvni radek 4 sloupce, druhy radek 3 sloupce
 */
const keyboardLayouts = {
    5: [3,2],
    6: [3,3],
    7: [4,3],
    8: [4,4],
    9: [3,3,3],
    10: [4,4,2], // [5,5]
    11: [4,4,3],
}

/**
 * min = 0 az 1
 * max = 5 az 11 (11 je pro klavesnici s klavesy 0 - 10)
 */
function NumericKeyboard({min, max, click}) {
    console.log('RENDERER: NumericKeyboard')

    const handleOnClick = (number) => {
        click(number)
    }

    const keyboardLayout = keyboardLayouts[max - min + 1]

    const keyboards = []
    let key = min
    for (let i = 0; i < keyboardLayout.length; i++) {
        keyboards[i] = []
        for (let j = 0; j < keyboardLayout[i]; j++) {
            keyboards[i].push(<NumericButton number={key} click={handleOnClick}/>)
            key++
        }
    }

    return (
        <>
            {keyboards.map((row, index) => (
                <div /*rows*/ key={index}>
                    {row.map((col, index) => (
                        <span /*cols*/ key={index}>
                            {col}
                        </span>
                    ))}
                </div>
            ))}
        </>
    )
}

export default NumericKeyboard;
