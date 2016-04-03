import React from "react";
import { Link } from "react-router";

export default React.createClass({

    render: function () {
        return (
                <div className="item">
                    <div className="ui tiny image">
                        <img src={this.props.image}/>
                    </div>
                    <div className="content">
                        <a href={`/user/${this.props.uid}`} className="header">{this.props.username}</a>
                        <div className="description">
                            <p>{this.props.comment}</p>
                        </div>
                    </div>
                </div>
        );
    }

});
