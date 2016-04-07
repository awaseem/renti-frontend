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
import UserPage from "./components/User/User";
import CarPage from "./components/Car/Car";
import CreateCreditCard from "./components/CreateCreditCard/CreateCreditCard";
import AddCar from "./components/AddCar/AddCar";
import CreateTransaction from "./components/CreateTransaction/CreateTransaction";
import UserAdmin from "./components/UserAdmin/UserAdmin";

import "./styles/styles.css";

window.React = React;

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="signin" component={Signin}/>
            <Route path="signup" component={Signup}/>
            <Route path="user/admin" component={UserAdmin}/>
            <Route path="user/:uid" component={UserPage}/>
            <Route path="car/:plate" component={CarPage}/>
            <Route path="createCreditCard" component={CreateCreditCard}/>
            <Route path="newCar" component={AddCar}/>
            <Route path="rent/:plate" component={CreateTransaction}/>
        </Route>
    </Router>,
    document.getElementById("content")
);
