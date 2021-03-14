import React, {Component} from "react";
import Header from "./views/Header";
import AppRouter from "./components/shared/routers/AppRouter";
import Particles, {tsParticles} from "react-tsparticles"
import ParticleBackground from "./views/design/ParticleBackground";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 * deploy comment
 */


class App extends Component {
    render() {
        return (

            <div>
                <ParticleBackground/>
                {window.onbeforeunload = () => {
                    // Clear localStorage when window/browser is closed
                    localStorage.clear();

                }}

                <Header id="header"
                        style={{
                            position: 'absolute',
                            zIndex: '10'
                        }}/>
                <AppRouter id="main"
                           style={{
                               position: 'absolute',
                               zIndex: '10'
                           }}/>
            </div>
        );
    }
}

export default App;
