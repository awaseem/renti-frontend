import React from "react";
import Menu from "./Menu/Menu.js";

export default React.createClass({

    render: function () {
        return (
            <div>
                <Menu/>
                {this.props.children}
            </div>
        );
    }

});
