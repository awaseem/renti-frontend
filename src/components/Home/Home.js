import React from "react";
import { getCurrentUser, logout, checkAuth, checkUserCreditCard } from "../../lib/auth";
import { browserHistory } from "react-router";
import CarList from "../CarList/CarList";

const divStyle = {
    color: "white",
    backgroundImage: "url(" + "http://images.car.bauercdn.com/pagefiles/20934/ford_focus_rs_10.jpg" + ")",
    backgroundSize: "cover",
    paddingTop: "50%",
    WebkitTransition: "all", // note the capital "W" here
    msTransition: "all" // 'ms' is the only lowercase vendor prefix
};

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
            <div>
                <div style={divStyle} className="ui vertical padded center aligned segment">
                    <div className="ui text container">
                        <h2>Reimagine renting cars.</h2>
                    </div>
                </div>
                <div className="ui hidden divider"></div>
                <div className="ui hidden divider"></div>

                <CarList/>
            </div>
        );
    }

});
