import React from "react";

export default React.createClass({

    componentDidMount: function () {
    },

    render: function () {
        return (
            <div className="ui two column grid">
                <div className="column">
                    <h2>Loans on your car</h2>
                </div>
                <div className="column">
                    <h2>Cars you rent</h2>
                </div>
            </div>
        );
    }
});
