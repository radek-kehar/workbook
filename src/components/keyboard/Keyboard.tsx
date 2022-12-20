import {CommandKey, NumericKey, SymbolKey} from "@/components/keyboard/KeyKeyboard";
import {
    CommandKey as CommandKeyType,
    Keyboard as KeyboardModel,
    KeyboardKey,
    SymbolKey as SymbolKeyType
} from "@/model/examples";

class KeyboardKeys {
    private values: JSX.Element[][] = [];
    private group: number = 0;

    constructor() {
        this.values[this.group] = [];
    }

    add(value: JSX.Element): KeyboardKeys {
        if (value) {
            this.values[this.group].push(value);
        }
        return this;
    }

    nextGroup(): KeyboardKeys {
        this.group++;
        return this;
    }

    build(): JSX.Element[][] {
        const result: JSX.Element[][] = [];
        for (const temp of this.values) {
            result.push([...temp]);
        }
        return result;
    }
}

type SpecificKeyboardProps<T extends number | CommandKeyType | SymbolKeyType> = {
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
    4: [2, 2],
    5: [3, 2],
    6: [3, 3],
    7: [4, 3],
    8: [4, 4],
    9: [3, 3, 3],
    10: [5, 5], // [4,4,2]
    11: [4, 4, 3],
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
        <div className="flex flex-col justify-center items-center gap-y-2">
            {keyboard.map((row, index) => (
                <div /*rows*/ className="flex flex-row justify-center items-center gap-x-2" key={index}>
                    {row.map((col, index) => (
                        <div /*cols*/ key={index}>
                            {col}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const symbolKeyFactory = (keys, click, value) => {
    const key = keys.find(item => item.value === value)
    return key ? <SymbolKey value={key} click={click}/> : null
}

const SymbolKeyboard = ({keys, click}: SpecificKeyboardProps<SymbolKeyType>) => {
    // console.log('RENDERER: SymbolKeyboard')

    // const keyboardKeys = new KeyboardKeys();
    // keyboardKeys.add(symbolKeyFactory(keys, click, SymbolKeyType.GREATER_THAN));
    // keyboardKeys.add(symbolKeyFactory(keys, click, SymbolKeyType.EQUALS));
    // keyboardKeys.add(symbolKeyFactory(keys, click, SymbolKeyType.LESS_THAN));
    // keyboardKeys.nextGroup();
    // keyboardKeys.add(symbolKeyFactory(keys, click, SymbolKeyType.MINUS));
    // keyboardKeys.add(symbolKeyFactory(keys, click, SymbolKeyType.PLUS));
    // keyboardKeys.add(symbolKeyFactory(keys, click, SymbolKeyType.COMMA));
    // const values = keyboardKeys.build();
    //
    // return (
    //     <div className="flex flex-row justify-center items-center">
    //         {values.map(group => {
    //             return (
    //                 <div className="flex flex-col">
    //                     {group.map(keyboardKey => {
    //                         return keyboardKey;
    //                     })}
    //                 </div>
    //             )
    //         })}
    //     </div>
    // )

    return (
        <div className="flex flex-row justify-center items-center gap-x-2">
            <div className="flex flex-col gap-y-2">
                {symbolKeyFactory(keys, click, SymbolKeyType.GREATER_THAN)}
                {symbolKeyFactory(keys, click, SymbolKeyType.EQUALS)}
                {symbolKeyFactory(keys, click, SymbolKeyType.LESS_THAN)}
            </div>
            <div className="flex flex-col gap-y-2">
                {symbolKeyFactory(keys, click, SymbolKeyType.MINUS)}
                {symbolKeyFactory(keys, click, SymbolKeyType.PLUS)}
                {symbolKeyFactory(keys, click, SymbolKeyType.COMMA)}
            </div>
        </div>
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
        <div>
            {value.keys.numeric.length > 0 ? <NumericKeyboard keys={value.keys.numeric} click={click}/> : null}
            {value.keys.symbol.length > 0 ? <SymbolKeyboard keys={value.keys.symbol} click={click}/> : null}
            {value.keys.command.length > 0 ? <CommandKeyboard keys={value.keys.command} click={click}/> : null}
        </div>
    )
}
