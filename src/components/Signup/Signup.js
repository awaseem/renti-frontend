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
        createUser(this.refs.username.value.trim(),
            this.refs.password.value.trim(),
            this.refs.image.value.trim(),
            this.refs.first_name.value.trim(),
            this.refs.last_name.value.trim(),
            this.refs.address.value.trim(),
            this.refs.summary.value.trim(),
            this.refs.date_of_birth.value.trim(),
            this.refs.emailAddress.value.trim())
        .catch( (err) => {
            return err.response.json();
        } );
    },

    componentDidMount: function () {
        $("#sign-in-form")
            .form({
                on: "blur",
                fields: {
                    username: "empty",
                    password: "empty",
                    image: "empty",
                    first_name: "empty",
                    last_name: "empty",
                    address: "empty",
                    summary: "empty",
                    date_of_birth: "empty",
                    emailAddress: "empty"
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
                <div className="field">
                    <label>First Name</label>
                    <input type="text" ref="first_name" name="first_name" placeholder="Enter your first name"></input>
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input type="text" ref="last_name" name="last_name" placeholder="Enter your last name"></input>
                </div>
                <div className="field">
                    <label>Address</label>
                    <input type="text" ref="address" name="address" placeholder="Enter an address"></input>
                </div>
                <div className="field">
                    <label>Summary</label>
                    <input type="text" ref="summary" name="summary" placeholder="Enter a summary about yourself"></input>
                </div>
                <div className="field">
                    <label>Date of Birth</label>
                    <input type="text" ref="date_of_birth" name="date_of_birth" placeholder="Select your date of birth"></input>
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
