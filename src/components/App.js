import React from "react";
import Menu from "./Menu/Menu.js";

export default React.createClass({

    render: function () {
        return (
            <div>
                <Menu/>
                <div className="ui main container" style={{marginTop: "5em"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});
