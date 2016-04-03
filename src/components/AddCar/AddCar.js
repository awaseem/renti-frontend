import React from "react";
import { addCar } from "../../lib/car";
import { getCurrentUser } from "../../lib/auth";
import { browserHistory } from "react-router";

export default React.createClass({

    getInitialState: function () {
        return {
            error: ""
        };
    },

    onSubmit: function (e) {
        e.preventDefault();
        this.setState({
            error: ""
        });
        const currentUser = getCurrentUser();
        addCar(currentUser.uid,
            this.refs.licensePlate.value.trim(),
            this.refs.model.value.trim(),
            this.refs.make.value.trim(),
            this.refs.year.value.trim(),
            this.refs.numberOfSeats.value.trim(),
            this.refs.price.value.trim(),
            this.refs.colour.value.trim(),
            this.refs.image.value.trim(),
            this.refs.summary.value.trim())
        .then( (data) =>
            console.log(data)
        )
        .then( () => {
            // redirect to user admin page after login
            browserHistory.push("/user/admin");
        })
        .catch( (err) => {
            this.setState({
                error: "Unable to add car."
            });
            return err.response.json().then( (value) => {
                Object.keys(value.error).map((error) => {
                    console.log(value.error[error]);
                });
            });
        } );
    },

    componentDidMount: function () {
        $("#add_car-form")
            .form({
                on: "blur",
                fields: {
                    licensePlate: ["empty"],
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
                onSuccess: this.onSubmit
            });
    },

    render: function () {
        return (
            <form id="add_car-form" className="ui form">
                <div className="equal width fields">
                    <div className="field">
                        <label>Make</label>
                        <input type="text" ref="make" name="make" placeholder="Car Make"></input>
                    </div>
                    <div className="field">
                        <label>Model</label>
                        <input type="text" ref="model" name="model" placeholder="Car Model"></input>
                    </div>
                    <div className="field">
                        <label>Year</label>
                        <input type="text" ref="year" name="year" placeholder="YYYY"></input>
                    </div>
                </div>

                <div className="equal width fields">
                    <div className="field">
                        <label>Number of Seats</label>
                        <input type="text" ref="numberOfSeats" name="numberOfSeats" placeholder="#"></input>
                    </div>
                    <div className="field">
                        <label>Price per day</label>
                        <input type="text" ref="price" name="price" placeholder="price"></input>
                    </div>
                    <div className="field">
                        <label>Colour</label>
                        <input type="text" ref="colour" name="colour" placeholder="Colour"></input>
                    </div>
                </div>

                <div className="equal width fields">
                    <div className="field">
                        <label>License Plate</label>
                        <input type="text" ref="licensePlate" name="licensePlate" placeholder="Plate"></input>
                    </div>
                    <div className="field">
                        <label>Image URL</label>
                        <input type="text" ref="image" name="image" placeholder="URL to image"></input>
                    </div>
                </div>
                <div className="field">
                    <label>Summary</label>
                    <input type="text" ref="summary" name="summary" placeholder="Description about car"></input>
                </div>
                <button className="ui green button">Submit</button>
                <div style={{ display: this.state.error ? "block" : "none"}} className="ui error message">{this.state.error}</div>
            </form>
        );
    }
});
