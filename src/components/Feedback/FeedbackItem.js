import React from "react";
import { Link } from "react-router";

export default React.createClass({

    render: function () {
        return (
            <div className="comment">
                <a className="avatar">
                    <img className="ui tiny image" src={this.props.image}/>
                </a>
                <div class="content">
                    <a href={`/user/${this.props.uid}`} className="author">{this.props.username}</a>
                    <div className="text">
                        {this.props.comment}
                    </div>
                </div>
            </div>
        );
    }

});
