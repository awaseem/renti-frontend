import React from "react";
import Menu from "./Menu/Menu.js";
import Header from "./Header/Header.js";

export default React.createClass({

    render: function () {
        return (
            <div>
                <Menu/>
                { this.props.location.pathname == "/" ? undefined : <Header/> }
                <div className="ui main container" style={{marginTop: "5em"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});
