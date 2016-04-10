import React from "react";
import Menu from "./Menu/Menu.js";
import Header from "./Header/Header.js";

export default React.createClass({

    render: function () {
        return (
            <div>
                <Menu/>
                <Header/>
                <div className="ui main container">
                    {this.props.children}
                </div>
            </div>
        );
    }
});
