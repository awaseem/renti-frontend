import React from "react";

export default React.createClass({

    render: function() {
        return (
            <div className="site-header ui center aligned padded grid">
                <div className="row">
                    <div className="column">
                        <img className="ui centered medium image" src="https://i.imgur.com/0oZwP59.png"/>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="header-text">Reimagine renting cars.</div>
                    </div>
                </div>
            </div>
        );
    }
});
