import NumericLabel from "../numeric/NumericLabel";
import Operator, {Operators} from "./Operator";

function BinaryOperation({firstOperand, secondOperand, operator, result}) {
    return (
        <>
            <NumericLabel number={firstOperand}/>
            <Operator type={operator}/>
            <NumericLabel number={secondOperand}/>
            <Operator type={Operators.equals}/>
            <NumericLabel number={result}/>
        </>
    )
}

export default BinaryOperation;
