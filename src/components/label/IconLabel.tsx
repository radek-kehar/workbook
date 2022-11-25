import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconName} from '@fortawesome/fontawesome-common-types';
import {CommandKey, Operator, SymbolKey} from "@/model/examples";

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

export interface IconLabelProp<T extends any> {
    value: T
}

/**
 * Common icon label
 */
export function IconLabel ({value} : IconLabelProp<Icon>) {
    const name: IconName = IconDef[value]
    return <FontAwesomeIcon icon={['fas', name]}/>
}

const CommandKeyIconDef: Record<CommandKey, Icon> = {
    [CommandKey.ENTER]: Icon.CHECK,
    [CommandKey.BACKSPACE]: Icon.DELETE
}

/**
 * Command icon label
 */
export function  CommandIconLabel ({value} : IconLabelProp<CommandKey>) {
    return <IconLabel value={CommandKeyIconDef[value]}/>
}

const SymbolKeyIconDef: Record<SymbolKey, Icon> = {
    [SymbolKey.EQUALS]: Icon.EQUALS,
    [SymbolKey.GREATER_THAN]: Icon.GREATER_THAN,
    [SymbolKey.LESS_THAN]: Icon.LESS_THAN,
    [SymbolKey.MINUS]: Icon.MINUS,
    [SymbolKey.PLUS]: Icon.PLUS,
    [SymbolKey.COMMA]: Icon.MINUS // todo: dosadit spravnou ikonu
}

/**
 * Symbol icon label
 */
export function  SymbolIconLabel ({value} : IconLabelProp<SymbolKey>) {
    return <IconLabel value={SymbolKeyIconDef[value]}/>
}

const OperatorIconDef: Record<Operator, Icon> = {
    [Operator.EQUALS]: Icon.EQUALS,
    [Operator.GREATER_THAN]: Icon.GREATER_THAN,
    [Operator.LESS_THAN]: Icon.LESS_THAN,
    [Operator.ADD]: Icon.PLUS,
    [Operator.SUB]: Icon.MINUS,
}

/**
 * Operator icon label
 */
export function  OperatorIconLabel ({value} : IconLabelProp<Operator>) {
    return <IconLabel value={OperatorIconDef[value]}/>
}


