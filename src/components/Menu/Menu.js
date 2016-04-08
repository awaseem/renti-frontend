import React from "react";
import { getCurrentUser, logout, checkAuth } from "../../lib/auth";
import { Link, browserHistory } from "react-router";

export default React.createClass({

    onLogout: function () {
        logout();
        browserHistory.push("/signin");
    },

    render: function() {
        return (
            <div className="ui inverted top fixed menu">
              <div className="ui container">
                <Link to={"/"} className="vertically fitted item">
                    <img className="ui image" src="http://i.imgur.com/WdCilzI.png"/>
                </Link>
                <div className="right menu">
                    { checkAuth() ? <Link to="/user/admin" className="item">{ getCurrentUser().first_name }</Link> : <Link to="/signup" className="item">Sign Up</Link> }
                    { checkAuth() ? <div className="item"><button onClick={this.onLogout} className="ui red button">Log out</button></div> : <div className="item"><Link to="/signin" className="ui blue button">Log In</Link></div> }
                </div>
              </div>
            </div>
        );
    }
});
