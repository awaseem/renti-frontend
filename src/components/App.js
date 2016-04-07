import React from "react";
import Menu from "./Menu/Menu.js";

export default React.createClass({

    render: function () {
        return (
            <div>
                <Menu/>
                <div className="ui container">
                    {this.props.children}
                </div>
            </div>
        );
    }

});
