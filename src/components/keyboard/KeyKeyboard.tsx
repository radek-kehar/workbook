import {
    Answer,
    CommandKey as CommandKeyType,
    KeyboardKey,
    KeyboardKeyStyle,
    SymbolKey as SymbolKeyType
} from "@/model/examples";
import {ReactNode} from "react";
import {CommandIconLabel, SymbolIconLabel} from "@/components/label/IconLabel";
import {classNames} from "@/lib/utils";

type KeyProps<T extends number | SymbolKeyType | CommandKeyType> = {
    value: KeyboardKey<T>,
    click: (value: KeyboardKey<T>) => void
}

type CommonKeyProps<T extends number | SymbolKeyType | CommandKeyType> = {
    children: ReactNode
} & KeyProps<T>

const CommonKey = <T extends number | SymbolKeyType | CommandKeyType>({value, click, children}: CommonKeyProps<T>) => {
    // console.log(`RENDERER: CommonKey ${key.value}`)

    const handleOnClick = (event) => {
        event.preventDefault()
        click(value)
    }

    let bg
    if (value.style === KeyboardKeyStyle.POSITIVE) {
        bg = 'bg-positive'
    } else if (value.style === KeyboardKeyStyle.NEGATIVE) {
        bg = 'bg-negative'
    }

    return (
        <button type="button" disabled={value.disabled} onClick={handleOnClick}
                className={classNames(bg, "flex flex-row justify-center items-center overflow-hidden rounded-lg border border-gray-100 p-4")}>
            {children}
        </button>
    )
}

export const NumericKey = (props: KeyProps<number>) => {
    // console.log(`RENDERER: NumericKey ${value.value}`)

    return (
        <CommonKey {...props}>
            {props.value.value}
        </CommonKey>
    )
}

export const CommandKey = (props: KeyProps<CommandKeyType>) => {
    // console.log(`RENDERER: CommandKey`)

    return (
        <CommonKey {...props}>
            <CommandIconLabel value={props.value.value}/>
        </CommonKey>
    )
}

export const SymbolKey = (props: KeyProps<SymbolKeyType>) => {
    // console.log(`RENDERER: SymbolKey`)

    return (
        <CommonKey {...props}>
            <SymbolIconLabel value={props.value.value}/>
        </CommonKey>
    )
}
