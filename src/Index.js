import "whatwg-fetch";

// Import React components
import React from "react";
import { render } from "react-dom";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

// Import main components
import App from "./components/App";
import Home from "./components/Home/Home";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";

window.React = React;

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="signin" component={Signin}/>
            <Route path="signup" component={Signup}/>
        </Route>
    </Router>,
    document.getElementById("content")
);
