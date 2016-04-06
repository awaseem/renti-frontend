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
            <div className="ui stackable inverted menu">
              <div className="ui container">
                <a href="#" className="header item">
                  <img className="logo" src="http://i.imgur.com/pXlkRaH.png"/> { " Renti" }
                </a>
                <Link to={"/"} className="item">Home</Link>
                    { checkAuth() ? <Link to="/user/admin" className="item">{ getCurrentUser().first_name }</Link> : <Link to="/signup" className="item">Sign Up</Link> }
                    { checkAuth() ? <div className="item"><button onClick={this.onLogout} className="ui red button">Log out</button></div> : <div className="item"><Link to="/signin" className="ui blue button">Log In</Link></div> }
              </div>
            </div>
        );
    }
});
