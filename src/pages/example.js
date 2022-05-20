import {createGenerator} from "../lib/generator/examples";
import {Operator, Unknown} from "../model/examples";
import Example from "../components/example/Example";

export default function ExamplePage() {
    const options = [
        // {type: Operator.ADD, range: {minDigit: 0, maxDigit: 10}, unknowns: [Unknown.RESULT]},
        // {type: Operator.SUB, range: {minDigit: 0, maxDigit: 10}, unknowns: [Unknown.RESULT]},
        // {type: Operator.ADD, range: {minDigit: 10, maxDigit: 20}, unknowns: [Unknown.RESULT]},
        // {type: Operator.SUB, range: {minDigit: 10, maxDigit: 20}, unknowns: [Unknown.RESULT]},
        {type: Operator.ADD, range: {minDigit: 0, maxDigit: 20}, unknowns: [Unknown.RESULT]},
    ];
    const generator = createGenerator(options);

    return (
        <Example generator={generator} count={5}/>
    );
}
