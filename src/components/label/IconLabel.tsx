import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconName} from '@fortawesome/fontawesome-common-types';
import {CommandKey, KeyType, Operator, SymbolKey} from "../../model/examples";

export enum Icon {
    EQUALS,
    GREATER_THAN,
    LESS_THAN,
    PLUS,
    MINUS,
    CHECK,
    COMMA,
    DELETE
}

const IconDef: Record<Icon, IconName> = {
    [Icon.EQUALS]: 'equals',
    [Icon.GREATER_THAN]: 'greater-than',
    [Icon.LESS_THAN]: 'less-than',
    [Icon.PLUS]: 'plus',
    [Icon.MINUS]: 'minus',
    [Icon.CHECK]: 'check',
    [Icon.COMMA]: 'comma',
    [Icon.DELETE]: 'delete-left'
}

const OperatorIconDef: Record<string, Icon> = {
    [Operator.ADD.toString()]: Icon.PLUS,
    [Operator.SUB.toString()]: Icon.MINUS,
}

const SymbolKeyIconDef: Record<SymbolKey, Icon> = {
    [SymbolKey.EQUALS]: Icon.EQUALS,
    [SymbolKey.GREATER_THAN]: Icon.GREATER_THAN,
    [SymbolKey.LESS_THAN]: Icon.LESS_THAN,
    [SymbolKey.MINUS]: Icon.MINUS,
    [SymbolKey.COMMA]: Icon.MINUS // todo: dosadit spravnou ikonu
}

const CommandKeyIconDef: Record<CommandKey, Icon> = {
    [CommandKey.ENTER]: Icon.CHECK,
    [CommandKey.BACKSPACE]: Icon.DELETE
}

export interface IconLabelProp {
    type: 'icon' | 'operator' | KeyType
    value: Icon | string | CommandKey | SymbolKey
}

/**
 * Common icon label
 */
export function IconLabel ({value, type = 'icon'} : IconLabelProp) {
    let icon: Icon
    if (type === 'icon') {
        icon = value as Icon
    } else if (type === 'operator') {
        icon = OperatorIconDef[value.toString()]
    } else if (type === KeyType.SYMBOL) {
        icon = SymbolKeyIconDef[value]
    } else if (type === KeyType.COMMAND) {
        icon = CommandKeyIconDef[value]
    }
    const name: IconName = IconDef[icon]
    return <FontAwesomeIcon icon={['fas', name]}/>
}


