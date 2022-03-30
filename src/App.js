import './App.css';
import NumericKeyboard from "./components/numeric/NumericKeyboard";
import BinaryOperation from "./components/operation/BinaryOperation";
import {Operators} from "./components/operation/Operator";
import ProgressBar from "./components/bar/ProgressBar";

function App() {
    const handleOnClick = (number) => {
        console.log(number)
    }

    return (
        <div className="App">
            <ProgressBar max={10} value={5}/>
            <BinaryOperation firstOperand={2} secondOperand={3} operator={Operators.plus} result={5}/>
            <NumericKeyboard min={0} max={5} click={handleOnClick}/>
        </div>
    );
}

export default App;
