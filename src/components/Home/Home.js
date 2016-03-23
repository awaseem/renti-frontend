import React from "react";
import { getCurrentUser, logout, checkAuth } from "../../lib/auth";
import { browserHistory } from "react-router";

export default React.createClass({

    onLogout: function () {
        logout();
        browserHistory.push("/signin");
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
            <div className="ui container">
                <h1>Welcome to Renti!</h1>
                <h2>Current User is: </h2>
                {userInfo}
                {/*you can also use checkAuth to see if anyone is logged in*/}
                { checkAuth() ? <button onClick={this.onLogout} className="ui red button">Log out</button> : undefined }
            </div>
        );
    }

});
