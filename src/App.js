import React, {Component} from "react";
import Header from "./views/Header";
import AppRouter from "./components/shared/routers/AppRouter";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * deploy comment
 */
class App extends Component {
    render() {
        return (
            <div>
                {window.onbeforeunload = () => {
                    // Clear localStorage when window/browser is closed
                    localStorage.clear();
                }}
                <Header height={"100"}/>
                <AppRouter/>
            </div>
        );
    }
}

export default App;
