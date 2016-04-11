import React from "react";
import { Link } from "react-router";

export default React.createClass({

    getInitialState: function () {
        return {
            edit: false
        };
    },

    onEdit: function (e) {
        e.preventDefault();
        this.props.handleEdit(this.props.id, this.refs);
        this.setState({
            edit: !this.state.edit
        });
    },

    onDelete: function (e) {
        e.preventDefault();
        this.props.handleDelete(this.props.id);
    },

    componentDidMount: function () {
        $("#" + this.props.id.replace(/ /g,""))
            .form({
                on: "blur",
                fields: {
                    model: "empty",
                    make: "empty",
                    year: ["exactLength[4]", "integer", "empty"],
                    numberOfSeats: ["integer", "empty"],
                    price: ["number", "empty"],
                    colour: "empty",
                    image: ["url", "empty"],
                    summary: "empty"
                },
                inline: true,
                onSuccess: this.onEdit
            });
    },

    render: function () {
        let rentButton = undefined;
        let interactionType = undefined;
        let editButton = undefined;
        if (this.props.rentHandler) {
            rentButton = <div onClick={this.props.rentHandler} className="ui bottom attached blue button">Rent</div>;
        }
        if (this.props.carData) {
            interactionType =
            <form className="ui form" style={{ display: this.state.edit ? "block" : "none", paddingLeft: "10px", paddingRight: "10px"}}  id={this.props.id.replace(/ /g,"")}>
                <div className="equal width fields">
                </div>
                <div className="field">
                    <label>Model</label>
                    <input type="text" ref="model" defaultValue={this.props.carData.model} name="model"/>
                </div>
                <div className="field">
                    <label>Make</label>
                    <input type="text" ref="make" defaultValue={this.props.carData.make} name="make"/>
                </div>
                <div className="field">
                    <label>Year</label>
                    <input type="text" ref="year" defaultValue={this.props.carData.year} name="year"/>
                </div>
                <div className="field">
                    <label>Number of seats</label>
                    <input type="text" ref="numberOfSeats" defaultValue={this.props.carData.number_of_seats} name="numberOfSeats"/>
                </div>
                <div className="field">
                    <label>Price</label>
                    <input type="text" ref="price" defaultValue={this.props.carData.price} name="price"/>
                </div>
                <div className="field">
                    <label>Colour</label>
                    <input type="text" ref="colour" defaultValue={this.props.carData.colour} name="colour"/>
                </div>
                <div className="field">
                    <label>Image</label>
                    <input type="text" ref="image" defaultValue={this.props.carData.image} name="image"/>
                </div>
                <div className="field">
                    <label>Summary</label>
                    <input type="text" ref="summary" defaultValue={this.props.carData.summary} name="summary"/>
                </div>
                <div className="ui buttons" style={ { paddingBottom: "10px"}}>
                    <input className="ui green button" type="submit" name="edit"/>
                    <button className="ui blue button" onClick={ (e) => { e.preventDefault(); this.setState({ edit: !this.state.edit}); } }>Done</button>
                    <button className="ui red button" onClick={this.onDelete}>Delete</button>
                </div>
            </form>;
        }
        if (!this.state.edit && this.props.carData) {
            editButton = <button className="ui green button" onClick={ () => this.setState({ edit: !this.state.edit}) }>Edit</button>;
        }
        return (
            <div className="ui card">
                <div className="image">
                    <img className="ui medium image" src={this.props.image}/>
                </div>
                <div className="content">
                    <Link to={`/car/${this.props.id}`} className="header">{this.props.year} {this.props.make} {this.props.model}</Link>
                    <div className="meta">
                        <Link to={`/user/${this.props.uid}`}>{this.props.user}</Link>
                    </div>
                    <div className="description">
                        Number of seats: {this.props.numberOfSeats} <br/>
                        Colour: {this.props.colour}
                    </div>
                </div>
                <div className="extra content">
                    <span>
                        <i className="money icon"></i>
                        ${this.props.price}/day
                    </span>
                </div>
                { rentButton }
                { editButton }
                { interactionType }
            </div>
        );
    }

});
