import React from "react";
import { createUser } from "../../lib/auth";
import { setToken } from "../../lib/tokenStorage";
import { browserHistory } from "react-router";

export default React.createClass({

    getInitialState: function () {
        return {
            error: ""
        };
    },

    onSubmit: function (e) {
        console.log("It is in onSubmit");
        e.preventDefault();
        const dateOfBirth = new Date(this.refs.year.value.trim(),
            this.refs.month.value.trim() - 1, // month is 0 based
            this.refs.day.value.trim());
        createUser(this.refs.username.value.trim(),
            this.refs.password.value.trim(),
            this.refs.image.value.trim(),
            this.refs.first_name.value.trim(),
            this.refs.last_name.value.trim(),
            this.refs.address.value.trim(),
            this.refs.summary.value.trim(),
            dateOfBirth.getTime(),
            this.refs.emailAddress.value.trim())
        .catch( (err) => {
            return err.response.json();
        } )
        .then( (value) => value ? this.setState({
            error: value.error ? value.error : "Unknown error has occurred!"
        }) : undefined );
    },

    componentDidMount: function () {
        $("#sign-in-form")
            .form({
                on: "blur",
                fields: {
                    username: "empty",
                    password: ["minLength[6]", "empty"],
                    image: ["url", "empty"],
                    first_name: "empty",
                    last_name: "empty",
                    address: "empty",
                    summary: "empty",
                    month: ["integer", "exactLength[2]", "empty"],
                    day: ["integer", "exactLength[2]", "empty"],
                    year: ["integer", "exactLength[4]", "empty"],
                    emailAddress: ["email", "empty"]
                },
                inline: true,
                onSuccess: this.onSubmit
            });
    },

    render: function () {
        return (
            <form id="sign-in-form" className="ui form">
                <div className="field">
                    <label>Username</label>
                    <input type="text" ref="username" name="username" placeholder="Enter a username"></input>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" ref="password" name="password" placeholder="Enter a Password"></input>
                </div>
                <div className="field">
                    <label>Image</label>
                    <input type="text" ref="image" name="image" placeholder="Enter an image URL"></input>
                </div>
                <div className="equal width fields">
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" ref="first_name" name="first_name" placeholder="Enter your first name"></input>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" ref="last_name" name="last_name" placeholder="Enter your last name"></input>
                    </div>
                </div>
                <div className="field">
                    <label>Address</label>
                    <input type="text" ref="address" name="address" placeholder="Enter an address"></input>
                </div>
                <div className="field">
                    <label>Summary</label>
                    <input type="text" ref="summary" name="summary" placeholder="Enter a summary about yourself"></input>
                </div>
                <div className="inline fields">
                <label>Date of Birth</label>
                    <div className="field">
                        <input type="text" ref="month" name="month" placeholder="MM"></input>
                    </div>
                    <div className="field">
                        <input type="text" ref="day" name="day" placeholder="DD"></input>
                    </div>
                    <div className="field">
                        <input type="text" ref="year" name="year" placeholder="YYYY"></input>
                    </div>
                </div>
                <div className="field">
                    <label>email address</label>
                    <input type="text" ref="emailAddress" name="emailAddress" placeholder="Enter your email"></input>
                </div>
                <button className="ui green button">Submit</button>
                <div style={{ display: this.state.error ? "block" : "none"}} className="ui error message">{this.state.error}</div>
            </form>
        );
    }

});
