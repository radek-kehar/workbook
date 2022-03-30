import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Operators = Object.freeze({
    equals: {
        icon: <FontAwesomeIcon icon={['fas', 'equals']}/>
    },
    greaterThan: {
        icon: <FontAwesomeIcon icon={['fas', 'greater-than']}/>
    },
    lessThan: {
        icon: <FontAwesomeIcon icon={['fas', 'less-than']}/>
    },
    plus: {
        icon: <FontAwesomeIcon icon={['fas', 'plus']}/>
    },
    minus: {
        icon: <FontAwesomeIcon icon={['fas', 'minus']}/>
    }
})

function Operator({type}) {
    return (
        type.icon
    )
}

export default Operator;
