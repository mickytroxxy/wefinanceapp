import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Dashboard from "./screens/Dashboard";
import Landing from "./screens/Landing";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import PaymentSuccess from "./screens/PaymentSuccess";
import PaymentFailed from "./screens/PaymentFailed";
import ReferredBy from "./screens/ReferredBy";
import Mobile from "./screens/containers/Mobile";
import history from './components/history';
import Privacy from "./screens/Privacy";
export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/SignIn" component={SignIn} />
                    <Route path="/SignUp" component={SignUp} />
                    <Route path="/Dashboard" component={Dashboard} />
                    <Route path="/PaymentSuccess" component={PaymentSuccess} />
                    <Route path="/PaymentFailed" component={PaymentFailed} />
                    <Route path="/Mobile" component={Mobile} />
                    <Route path="/Privacy" component={Privacy} />
                    <Route path="/ReferredBy/:phoneNumber" component={ReferredBy} />
                </Switch>
            </Router>
        )
    }
}