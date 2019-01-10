import React, {Component} from 'react';
import LoginForm from './LoginForm'
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "./HomePage";

class App extends Component {

    render() {
        return (
            <Router>
                <div style={{minHeight: '100%', width: '100%'}}>
                    <Route exact path={'/'} component={LoginForm}/>
                    <Route path={'/HomePage'} component={HomePage}/>
                </div>
            </Router>

        );
    }
}

export default App;
