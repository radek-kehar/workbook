import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconName} from '@fortawesome/fontawesome-common-types';
import {CommandKey, Operator, SymbolKey} from "@/model/examples";
import {classNames} from "@/lib/utils";

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
    className?: string,
    value: T
}

/**
 * Common icon label
 */
export function IconLabel ({className, value} : IconLabelProp<Icon>) {
    const name: IconName = IconDef[value]
    return <FontAwesomeIcon className={className} icon={['fas', name]}/>
}

const CommandKeyIconDef: Record<CommandKey, Icon> = {
    [CommandKey.ENTER]: Icon.CHECK,
    [CommandKey.BACKSPACE]: Icon.DELETE
}

/**
 * Command icon label
 */
export function  CommandIconLabel ({className, value} : IconLabelProp<CommandKey>) {
    return <IconLabel className={className} value={CommandKeyIconDef[value]}/>
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
export function  SymbolIconLabel ({className, value} : IconLabelProp<SymbolKey>) {
    return <IconLabel className={className} value={SymbolKeyIconDef[value]}/>
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
export function  OperatorIconLabel ({className, value} : IconLabelProp<Operator>) {
    return <IconLabel className={className} value={OperatorIconDef[value]} />
}


