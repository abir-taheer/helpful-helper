import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';

import {Landing} from './pages/Landing';
import {Login} from './pages/Login';

import {SnackbarQueue} from "@rmwc/snackbar";
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/button/dist/mdc.button.css';

import {Queue} from "./comp/Queue";
import {Profile} from "./pages/Profile";
import {Error404} from "./pages/Error404";


function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path={"/profile"} component={Profile}/>
                    <Route component={Error404}/>
                </Switch>
            </Router>
            <SnackbarQueue messages={Queue.messages}/>
        </div>
    );
}

export default App;
