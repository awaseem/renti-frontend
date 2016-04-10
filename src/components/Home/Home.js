import React from "react";
import { getCurrentUser, logout, checkAuth, checkUserCreditCard } from "../../lib/auth";
import { browserHistory } from "react-router";
import CarList from "../CarList/CarList";

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    onLogout: function () {
        logout();
        this.context.router.push("signin/");
    },

    render: function () {
        // You can use getCurrentUser to get all data about the current logged in user
        const user = getCurrentUser();
        let userInfo;
        // When adding elements through iteration, remember to add unique key prop to each element
        if (user) {
            userInfo = Object.keys(user).map((key) => <h3 key={Math.random()}>{key}:{user[key]}</h3>);
        }
        else {
            userInfo = <h3>No user logged in!</h3>;
        }
        return (
            <div>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>

                <CarList/>
            </div>
        );
    }

});
