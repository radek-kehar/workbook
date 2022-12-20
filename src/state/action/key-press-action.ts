import {
    Answer,
    BinaryExample,
    CommandKey,
    ComparisonExample,
    Example,
    Keyboard,
    KeyboardKey, KeyboardKeyStyle,
    KeyboardType,
    KeyType,
    Operator,
    ShowValue,
    Value
} from "@/model/examples";
import {OperationType, Unknown} from "@/model/generator";
import {AnswerType} from "@/components/modals/ConfirmationAlert";

//region UnknownFinder
interface UnknownFinder<T extends ComparisonExample | BinaryExample> {
    findUnknown(example: T): Value<any>;
}

class ComparisonUnknownFinder implements UnknownFinder<ComparisonExample> {

    findUnknown(example: ComparisonExample): Value<any> {
        return example.operator;
    }
}

class BinaryUnknownFinder implements UnknownFinder<BinaryExample> {

    findUnknown(example: BinaryExample): Value<any> {
        let temp = this.getUnknown(example.left);
        if (temp !== null) return temp;
        temp = this.getUnknown(example.right);
        if (temp !== null) return temp;
        temp = this.getUnknown(example.result);
        if (temp !== null) return temp;
        temp = this.getUnknown(example.operator);
        if (temp !== null) return temp;
    }

    private getUnknown(value: BinaryExample | Value<any>): Value<any> {
        if ('isUnknown' in value) {
            if (value.isUnknown) {
                return value;
            } else {
                return null;
            }
        } else {
            return this.findUnknown(value);
        }
    }
}

const unknownFinders = new Map<OperationType, UnknownFinder<any>>();
unknownFinders.set(OperationType.COMPARE, new ComparisonUnknownFinder());
unknownFinders.set(OperationType.ADD, new BinaryUnknownFinder());
unknownFinders.set(OperationType.SUB, new BinaryUnknownFinder());
//endregion

//region Unknown
class UnknownServantFactory {

    createUnknownServant(example: Example<ComparisonExample | BinaryExample>): NumberUnknownServant | OperatorUnknownServant {
        const unknown = unknownFinders.get(example.type).findUnknown(example.operation);
        switch (unknown.type) {
            case Unknown.OPERAND:
            case Unknown.RESULT:
                return new NumberUnknownServant(unknown);
            case Unknown.OPERATOR:
                return new OperatorUnknownServant(unknown);
            default:
                throw new Error(`Unsupported unknown type: ${unknown.type}`)
        }
    }
}

interface UnknownServant<T extends number | Operator> {
    set(value: T);

    add(value: T);

    remove();

    evaulate();

    show(value: ShowValue);
}

abstract class AbstractUnknownServant<T extends number | Operator> {

    protected value: Value<T>;

    constructor(value: Value<T>) {
        this.value = value;
    }

    evaulate(): Answer {
        return this.value.answer = (this.value.value === this.value.entered) ? Answer.CORRECT : Answer.WRONG;
    }

    show(value: ShowValue) {
        this.value.show = value;
    }
}

class NumberUnknownServant extends AbstractUnknownServant<number> implements UnknownServant<number> {

    constructor(value: Value<number>) {
        super(value);
    }

    set(value: number) {
        this.value.entered = value;
    }

    add(value: number) {
        this.value.entered = this.value.entered ? Number(`${this.value.entered}${value}`) : value;
    }

    remove() {
        if (this.value.entered !== null) {
            const entered = this.value.entered.toString().slice(0, -1);
            this.value.entered = entered.length > 0 ? Number(entered) : null;
        }
    }
}

class OperatorUnknownServant extends AbstractUnknownServant<Operator> implements UnknownServant<Operator> {

    constructor(value: Value<Operator>) {
        super(value);
    }

    set(value: Operator) {
        this.value.entered = value;
    }

    add(value: Operator) {
        this.set(value);
    }

    remove() {
        this.value.entered = null;
    }
}

//endregion

//region Keyboard
const disableKeyboard = (keyboard: Keyboard) => {
    const disabledFce = item => item.disabled = true;
    keyboard.keys.numeric.forEach(disabledFce);
    keyboard.keys.symbol.forEach(disabledFce);
    keyboard.keys.command.forEach(disabledFce);
}

const disableKey = (keyboard: Keyboard, key: KeyboardKey<any>) => {
    const disabledFce = item => item.disabled = item.disabled || (item.value === key.value);
    if (key.type === KeyType.NUMERIC) {
        keyboard.keys.numeric.forEach(disabledFce);
    } else if (key.type === KeyType.SYMBOL) {
        keyboard.keys.symbol.forEach(disabledFce);
    } else if (key.type === KeyType.COMMAND) {
        keyboard.keys.command.forEach(disabledFce);
    }
}

const setStyleKey = (keyboard: Keyboard, key: KeyboardKey<any>, style: KeyboardKeyStyle) => {
    const styledFce = item => item.style = item.value === key.value ? style : item.style;
    if (key.type === KeyType.NUMERIC) {
        keyboard.keys.numeric.forEach(styledFce);
    } else if (key.type === KeyType.SYMBOL) {
        keyboard.keys.symbol.forEach(styledFce);
    } else if (key.type === KeyType.COMMAND) {
        keyboard.keys.command.forEach(styledFce);
    }
}

const clearStyleKey = (keyboard: Keyboard) => {
    const styledFce = item => {
        if (item.style) {
            item.style = null;
        }
    };
    keyboard.keys.numeric.forEach(styledFce);
    keyboard.keys.symbol.forEach(styledFce);
    keyboard.keys.command.forEach(styledFce);
}
//endregion

// region Main executor
const factory = new UnknownServantFactory();

export const execute = (example: Example<any>, pressedKey: KeyboardKey<any>) => {
    const unknownServant = factory.createUnknownServant(example);

    if (example.keyboard.type === KeyboardType.AUTO_ENTER) {
        unknownServant.set(pressedKey.value);
        example.answer = unknownServant.evaulate();
        if (example.answer === Answer.CORRECT) {
            unknownServant.show(ShowValue.ENTERED);
            disableKeyboard(example.keyboard);
            setStyleKey(example.keyboard, pressedKey, KeyboardKeyStyle.POSITIVE);

        } else if (example.answer === Answer.WRONG) {
            unknownServant.show(ShowValue.NONE);
            disableKey(example.keyboard, pressedKey);
            setStyleKey(example.keyboard, pressedKey, KeyboardKeyStyle.NEGATIVE);
        }

    } else if (example.keyboard.type === KeyboardType.CONFIRM_BY_ENTER) {
        if (pressedKey.type === KeyType.NUMERIC || pressedKey.type === KeyType.SYMBOL) {
            unknownServant.add(pressedKey.value);
            clearStyleKey(example.keyboard);

        } else if (pressedKey.type === KeyType.COMMAND) {
            if (CommandKey.BACKSPACE === pressedKey.value) {
                unknownServant.remove();
                clearStyleKey(example.keyboard);

            } else if (CommandKey.ENTER === pressedKey.value) {
                example.answer = unknownServant.evaulate();
                if (example.answer === Answer.CORRECT) {
                    disableKeyboard(example.keyboard);
                    setStyleKey(example.keyboard, pressedKey, KeyboardKeyStyle.POSITIVE);
                } else if (example.answer === Answer.WRONG) {
                    setStyleKey(example.keyboard, pressedKey, KeyboardKeyStyle.NEGATIVE);
                }
            }
        }
        unknownServant.show(ShowValue.ENTERED);
    }
}
//endregion
