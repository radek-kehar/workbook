import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {CommandKey, Operator, SymbolKey} from "@/model/examples";
import {icon} from '@fortawesome/fontawesome-svg-core/import.macro';
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {classNames} from "@/lib/utils";

export enum Icon {
    APPLE,
    BARS,
    CIRCLE,
    DELETE,
    EQUALS,
    GREATER_THAN,
    HEART,
    CHECK,
    LESS_THAN,
    LIGHTBULB,
    MINUS,
    PLUS,
    RING,
    ROTATE_LEFT,
    TRIANGLE_EXCLAMATION,
    XMARK
}

const IconDef: Record<Icon, IconDefinition> = {
    [Icon.APPLE]: icon({name: 'apple-whole', style: 'solid'}),
    [Icon.BARS]: icon({name: 'bars', style: 'solid'}),
    [Icon.CIRCLE]: icon({name: 'circle', style: 'regular'}),
    [Icon.DELETE]: icon({name: 'delete-left', style: 'solid'}),
    [Icon.EQUALS]: icon({name: 'equals', style: 'solid'}),
    [Icon.GREATER_THAN]: icon({name: 'greater-than', style: 'solid'}),
    [Icon.HEART]: icon({name: 'heart', style: 'regular'}),
    [Icon.CHECK]: icon({name: 'check', style: 'solid'}),
    [Icon.LESS_THAN]: icon({name: 'less-than', style: 'solid'}),
    [Icon.LIGHTBULB]: icon({name: 'lightbulb', style: 'regular'}),
    [Icon.MINUS]: icon({name: 'minus', style: 'solid'}),
    [Icon.PLUS]: icon({name: 'plus', style: 'solid'}),
    [Icon.RING]: icon({name: 'circle', style: 'solid'}),
    [Icon.ROTATE_LEFT]: icon({name: 'rotate-left', style: 'solid'}),
    [Icon.TRIANGLE_EXCLAMATION]: icon({name: 'triangle-exclamation', style: 'solid'}),
    [Icon.XMARK]: icon({name: 'xmark', style: 'solid'}),
}

export interface IconLabelProp<T extends any> {
    className?: string,
    value: T,
    onClick?: () => void
}

/**
 * Common icon label
 */
export function IconLabel ({className, value, onClick} : IconLabelProp<Icon>) {
    const iconDef: IconDefinition = IconDef[value];
    return <FontAwesomeIcon className={className} icon={iconDef} onClick={onClick}/>
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

export function IconCircle ({className, value, onClick} : IconLabelProp<Icon>) {
    return (
        <span className={classNames(className, 'fa-stack fa-lg')} onClick={onClick}>
            <IconLabel value={Icon.RING} className="fa-stack-2x"/>
            <IconLabel value={value} className="fa-stack-1x fa-inverse"/>
        </span>
    )
}


