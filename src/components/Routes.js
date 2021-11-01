import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Contact from "./Contact";
import Products from "./Products";
import Home from "./Home";
import Blog from "./Blog";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Contact" component={Contact} />
                    <Route path="/Products" component={Products} />
                    <Route path="/Blog" component={Blog} />
                </Switch>
            </Router>
        )
    }
}