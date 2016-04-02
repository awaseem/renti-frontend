import React from "react";

export default React.createClass({

    render: function () {
        if (this.props.show) {
            $(".ui.modal")
                .modal("show");
        }
        return (
            <div className="ui modal">
                <div className="header">{this.props.heading}</div>
                <div className="content">
                    <p>{this.props.message}</p>
                </div>
                <div className="actions">
                    <div className="ui black deny button">
                        Okay
                    </div>
                </div>
            </div>
        );
    }

});
