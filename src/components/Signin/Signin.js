import React from "react";
import { login } from "../../lib/auth";
import { setToken } from "../../lib/tokenStorage";
import { browserHistory } from "react-router";

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            error: ""
        };
    },

    onSubmit: function (e) {
        e.preventDefault();
        login(this.refs.username.value.trim(), this.refs.password.value.trim())
            .then( (res) => {
                setToken(res.token);
                // redirect to home page after login
                this.context.router.push("/");
            } )
            .catch( (err) => {
                err.response.json().then( (value) => value ? this.setState({
                    error: value.error ? value.error : "Unknown error has occurred!"
                }) : undefined );
            } );
            // If you make it to this then handler, we are trying to get the error response, check that the value is an error,
            // otherwise move on!

    },

    componentDidMount: function () {
        $("#sign-in-form")
            .form({
                on: "blur",
                fields: {
                    username: "empty",
                    password: "empty"
                },
                inline: true,
                onSuccess: this.onSubmit
            });
    },

    render: function () {
        return (
        <div className="ui centered padded grid">
            <div className="twelve wide column">
                <h1 className="ui center aligned header">Sign into Renti</h1>
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
                        <button className="ui green button">Submit</button>
                        <div style={{ display: this.state.error ? "block" : "none"}} className="ui error message">{this.state.error}</div>
                    </form>
                </div>
            </div>
        </div>
        );
    }

});
