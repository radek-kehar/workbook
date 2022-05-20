import {GeneratorOptions, NumericRange} from "../../../model/generator";
import {CommandKey, Keyboard, KeyboardKey, KeyboardType, KeyType, SymbolKey} from "../../../model/examples";

export const createKeyboard = (options: GeneratorOptions): Keyboard => {
    const range = options.range;
    const numberOfKeys = range.maxDigit - range.minDigit;
    if (numberOfKeys <= 10 && range.maxDigit <= 20) {
        return createKeyboardWithAutoEnter(range);
    } else {
        return createKeyboardWithConfirmByEnter();
    }
}

/**
 * Podporovano do 20.
 */
const createNumericKeys = (min: number, max: number): KeyboardKey<number>[] => {
    const keys: KeyboardKey<number>[] = [];
    for (let i = min; i <= max; i++) {
        keys.push({type: KeyType.NUMERIC, value: i, disabled: false});
    }
    return keys;
}

const createSymbolKeys = (...symbols: SymbolKey[]): KeyboardKey<SymbolKey>[] => {
    const keys: KeyboardKey<SymbolKey>[] = [];
    for (const symbol of symbols) {
        keys.push({type: KeyType.SYMBOL, value: symbol, disabled: false});
    }
    return keys;
}

const createCommandKeys = (...commands: CommandKey[]): KeyboardKey<CommandKey>[] => {
    const keys: KeyboardKey<CommandKey>[] = [];
    for (const comand of commands) {
        keys.push({type: KeyType.COMMAND, value: comand, disabled: false});
    }
    return keys;
}

const createKeyboardWithAutoEnter = ({minDigit, maxDigit}: NumericRange): Keyboard => {
    return {
        type: KeyboardType.AUTO_ENTER,
        keys: {
            numeric: createNumericKeys(minDigit, maxDigit),
            symbol: [],
            command: []
        }
    }
}

const createKeyboardWithConfirmByEnter = (): Keyboard => {
    return {
        type: KeyboardType.CONFIRM_BY_ENTER,
        keys: {
            numeric: createNumericKeys(0, 9),
            symbol: [],
            command: createCommandKeys(CommandKey.BACKSPACE, CommandKey.ENTER)
        }
    }
}
