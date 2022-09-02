import './App.css';
import Pages from "pages";
import {ProfileProvider} from "components/profile/ProfileProvider";

function App() {
    return (
        <div>
            <ProfileProvider>
                <Pages/>
            </ProfileProvider>
        </div>
    );
}

export default App;
