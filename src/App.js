import './App.css';
import Pages from "pages/index";
import {ExerciseProvider} from "components/exercise/ExerciseProvider";

function App() {
    return (
        <div>
            <ExerciseProvider>
                <Pages/>
            </ExerciseProvider>
        </div>
    );
}

export default App;
