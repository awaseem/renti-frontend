import React from "react";
import { Link } from "react-router";

export default React.createClass({

    render: function () {
        return (
            <div className="ui card">
                <div className="image">
                    <img src={this.props.image}/>
                </div>
                <div className="content">
                    <Link to={`/car/${this.props.id}`} className="header">{this.props.year} {this.props.make} {this.props.model}</Link>
                    <div className="meta">
                        <Link to={`/user/${this.props.uid}`}><span className="date">{this.props.user}</span></Link>
                    </div>
                    <div className="description">
                    Number of seats: {this.props.numberOfSeats} <br/>
                    Colour: {this.props.colour}
                    </div>
                </div>
                <div className="extra content">
                    <a>
                    <i className="money icon"></i>
                    ${this.props.price}/day
                    </a>
                </div>
                <div onClick={this.props.rentHandler} className="ui bottom attached blue button">
                    Rent
                </div>
            </div>
        );
    }

});
