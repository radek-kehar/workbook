import {
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

    let className
    if (value.style === KeyboardKeyStyle.POSITIVE) {
        className = 'bg-positive'
    } else if (value.style === KeyboardKeyStyle.NEGATIVE) {
        className = 'bg-negative disabled:text-gray-300'
    } else {
        className = 'disabled:text-gray-300'
    }

    return (
        <button type="button" disabled={value.disabled} onClick={handleOnClick}
                className={classNames(className, "flex flex-row justify-center items-center p-4 overflow-hidden rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-theme-background focus:ring-offset-2")}>
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
