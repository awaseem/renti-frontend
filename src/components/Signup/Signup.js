import React from "react";
import { createUser, login } from "../../lib/auth";
import { setToken } from "../../lib/tokenStorage";
import { browserHistory } from "react-router";
import DatePicker from "react-datepicker";
import moment from "moment";

require("react-datepicker/dist/react-datepicker.css");

export default React.createClass({

    getInitialState: function () {
        return {
            dateOfBirth: moment(),
            error: ""
        };
    },

    onSubmit: function (e) {
        e.preventDefault();
        this.setState({
            error: ""
        });
        createUser(this.refs.username.value.trim(),
            this.refs.password.value.trim(),
            this.refs.image.value.trim(),
            this.refs.first_name.value.trim(),
            this.refs.last_name.value.trim(),
            this.refs.address.value.trim(),
            this.refs.summary.value.trim(),
            this.state.dateOfBirth.unix(),
            this.refs.emailAddress.value.trim())
        .then( (data) =>
            console.log(data)
        )
        .then( () =>
            login(this.refs.username.value.trim(), this.refs.password.value.trim())
        )
        .then( (res) => {
            setToken(res.token);
            // redirect to home page after login
            browserHistory.push("/");
        })
        .catch( (err) => {
            return err.response.json().then( (value) => value ? this.setState({
                error: value.error ? value.error : "Unknown error has occurred!"
            }) : undefined );
        } );
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
                    emailAddress: ["email", "empty"]
                },
                inline: true,
                onSuccess: this.onSubmit
            });
    },

    handleChange: function(date) {
        this.setState({
            dateOfBirth: date
        });
    },

    render: function () {
        return (
        <div className="ui centered padded grid">
            <div className="column">
                <h1 className="ui center aligned header">Sign up for Renti</h1>
                <div className="ui segment">
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
                            <label>Date of Birth</label>
                            <DatePicker
                             selected={this.state.dateOfBirth}
                             showYearDropdown
                             onChange={this.handleChange} />
                        </div>
                        <div className="equal width fields">
                            <div className="field">
                                <label>Address</label>
                                <input type="text" ref="address" name="address" placeholder="Enter an address"></input>
                            </div>
                            <div className="field">
                                <label>Email Address</label>
                                <input type="text" ref="emailAddress" name="emailAddress" placeholder="Enter your email"></input>
                            </div>
                        </div>
                        <div className="field">
                            <label>Summary</label>
                            <textarea rows="2" ref="summary" name="summary" placeholder="Enter a summary about yourself"></textarea>
                        </div>
                        <button className="ui green button">Submit</button>
                        <div style={{ display: this.state.error ? "block" : "none"}} className="ui error message">{this.state.error}</div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
});
