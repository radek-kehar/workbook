import {CommandKey, NumericKey, SymbolKey} from "components/keyboard/KeyKeyboard";
import {Keyboard as KeyboardModel, CommandKey as CommandKeyType, SymbolKey as SymbolKeyType, KeyboardKey} from "model/examples";

type SpecificKeyboardProps<T extends number| CommandKeyType | SymbolKeyType> = {
    keys: KeyboardKey<T>[],
    click: (value: KeyboardKey<T>) => void
}

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
const NumericKeyboard = ({keys, click}: SpecificKeyboardProps<number>) => {
    // console.log('RENDERER: NumericKeyboard')

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

const symbolKeyFactory = (keys, click, value) => {
    const key = keys.find(item => item.value === value)
    return key ? <SymbolKey value={key} click={click}/> : null
}

const SymbolKeyboard = ({keys, click}: SpecificKeyboardProps<SymbolKeyType>) => {
    // console.log('RENDERER: SymbolKeyboard')

    return (
        <>
            {symbolKeyFactory(keys, click, SymbolKeyType.GREATER_THAN)}
            {symbolKeyFactory(keys, click, SymbolKeyType.EQUALS)}
            {symbolKeyFactory(keys, click, SymbolKeyType.LESS_THAN)}
            {symbolKeyFactory(keys, click, SymbolKeyType.MINUS)}
            {symbolKeyFactory(keys, click, SymbolKeyType.PLUS)}
            {symbolKeyFactory(keys, click, SymbolKeyType.COMMA)}
        </>
    )
}

const commandKeyFactory = (keys, click, value) => {
    const key = keys.find(item => item.value === value)
    return key ? <CommandKey value={key} click={click}/> : null
}

const CommandKeyboard = ({keys, click}: SpecificKeyboardProps<CommandKeyType>) => {
    // console.log('RENDERER: CommandKeyboard')

    return (
        <>
            {commandKeyFactory(keys, click, CommandKeyType.BACKSPACE)}
            {commandKeyFactory(keys, click, CommandKeyType.ENTER)}
        </>
    )
}

type KeyboardProps = {
    value: KeyboardModel,
    click: (value: KeyboardKey<any>) => void
}

export default function Keyboard({value, click}: KeyboardProps) {
    // console.log('RENDERER: Keyboard')

    return (
        <>
            {value.keys.numeric.length > 0 ? <NumericKeyboard keys={value.keys.numeric} click={click}/> : null}
            {value.keys.symbol.length > 0 ? <SymbolKeyboard keys={value.keys.symbol} click={click}/> : null}
            {value.keys.command.length > 0 ? <CommandKeyboard keys={value.keys.command} click={click}/> : null}
        </>
    )
}
