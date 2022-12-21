import './App.css';
import Pages from "./pages";
import {ProfileProvider} from "./components/profile/ProfileProvider";
import {ThemeProvider} from "@/components/themes/ThemeProvider";

function App() {
    return (
        <div>
            <ThemeProvider>
                <ProfileProvider>
                    <Pages/>
                </ProfileProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
