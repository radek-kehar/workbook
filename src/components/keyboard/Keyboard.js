import {IconKey, NumericKey} from "components/keyboard/KeyKeyboard";
import {CommandKey, SymbolKey} from "model/examples";

/**
 key = pocet cisel na klavesnici
 value = rozlozeni klavesnice; napr. [4,3] znamena prvni radek 4 sloupce, druhy radek 3 sloupce
 */
const KeyboardWithoutEnterLayouts = {
    1: [1],
    2: [2],
    3: [3],
    4: [2,2],
    5: [3,2],
    6: [3,3],
    7: [4,3],
    8: [4,4],
    9: [3,3,3],
    10: [5,5], // [4,4,2]
    11: [4,4,3],
}

/**
 * min = 0 az 1
 * max = 5 az 11 (11 je pro klavesnici s klavesy 0 - 10)
 */
const NumericKeyboard = ({keys, click}) => {
    console.log('RENDERER: NumericKeyboard')

    const keyboard = []
    let idx = 0

    const keyboardLayout = KeyboardWithoutEnterLayouts[keys.length]
    for (let i = 0; i < keyboardLayout.length; i++) {
        keyboard[i] = []
        for (let j = 0; j < keyboardLayout[i]; j++) {
            keyboard[i].push(<NumericKey value={keys[idx]} click={click}/>)
            idx++
        }
    }

    return (
        <>
            {keyboard.map((row, index) => (
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

const iconKeyFactory = (keys, click, value) => {
    const key = keys.find(item => item.value === value)
    return key ? <IconKey value={key} click={click}/> : null
}

const SymbolKeyboard = ({keys, click}) => {
    console.log('RENDERER: SymbolKeyboard')

    return (
        <>
            {iconKeyFactory(keys, click, SymbolKey.GREATER_THAN)}
            {iconKeyFactory(keys, click, SymbolKey.EQUALS)}
            {iconKeyFactory(keys, click, SymbolKey.LESS_THAN)}
            {iconKeyFactory(keys, click, SymbolKey.MINUS)}
            {iconKeyFactory(keys, click, SymbolKey.PLUS)}
            {iconKeyFactory(keys, click, SymbolKey.COMMA)}
        </>
    )
}

const CommandKeyboard = ({keys, click}) => {
    console.log('RENDERER: CommandKeyboard')

    return (
        <>
            {iconKeyFactory(keys, click, CommandKey.BACKSPACE)}
            {iconKeyFactory(keys, click, CommandKey.ENTER)}
        </>
    )
}

export default function Keyboard({value, click}) {
    console.log('RENDERER: Keyboard')

    return (
        <>
            {value.keys.numeric.length > 0 ? <NumericKeyboard keys={value.keys.numeric} click={click}/> : null}
            {value.keys.symbol.length > 0 ? <SymbolKeyboard keys={value.keys.symbol} click={click}/> : null}
            {value.keys.command.length > 0 ? <CommandKeyboard keys={value.keys.command} click={click}/> : null}
        </>
    )
}
