import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Dashboard from "./screens/Dashboard";
import Landing from "./screens/Landing";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import history from './components/history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/SignIn" component={SignIn} />
                    <Route path="/SignUp" component={SignUp} />
                    <Route path="/Dashboard" component={Dashboard} />
                </Switch>
            </Router>
        )
    }
}