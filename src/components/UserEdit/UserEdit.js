import React from "react";
import { checkAuth, getCurrentUser } from "../../lib/auth";
import { getUserById, updateUser } from "../../lib/user";
import ErrorPopUp from "../PopUp/PopUp";

export default React.createClass({

    getInitialState: function () {
        return {
            userData: "",
            formState: "noEdit",
            success: false,
            error: ""
        };
    },

    componentDidMount: function () {
        const userData = getCurrentUser();
        if (userData === undefined) {
            this.setState({
                error: "noCurrentUser"
            });
            return;
        }

        getUserById(userData.uid)
        .then( (data) => {
            console.log(data);
            this.setState({
                userData: data
            });
            this.refs.image.value = data.image;
            this.refs.address.value = data.address;
            this.refs.summary.value = data.summary;
            this.refs.emailAddress.value = data.email;
        })
        .catch( (err) => {
            console.error(err);
            this.setState({
                error: "noCurrentUser"
            });
        });

        $("#user-edit-form")
            .form({
                on: "blur",
                fields: {
                    image: ["url", "empty"],
                    address: "empty",
                    summary: "empty",
                    emailAddress: ["email", "empty"]
                },
                inline: true,
                onSuccess: this.onSubmit
            });
    },

    onSubmit: function (e) {
        e.preventDefault();
        this.setState({
            success: false,
            error: ""
        });
        updateUser(this.state.userData.uid,
            this.refs.address.value.trim(),
            this.refs.emailAddress.value.trim(),
            this.refs.image.value.trim(),
            this.refs.summary.value.trim())
        .then( (response) => {
            this.setState({
                success: true
            });
        })
        .catch( (err) => {
            console.error(err);
            this.setState({
                error: "Error: Unable to update user"
            });
        });
    },

    render: function () {
        const userData = this.state.userData;
        if (this.state.error === "noCurrentUser") {
            console.log("displaying popup");
            return (
                <div>
                    <ErrorPopUp show={true} heading="Error" message="Must be logged in to view!"/>
                    <label>You must be logged in to view this page.</label>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="ui grid">
                        <div className="row">
                            <div className="center aligned column">
                                <h1>{userData.first_name} {userData.last_name}</h1>
                                <img className="ui small centered circular image" src={userData.image}/>
                                <h5>username: {userData.username}</h5>
                            </div>
                        </div>
                        <div className="ui divider"></div>
                    </div>
                    <form id="user-edit-form" className="ui form">
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
                            <label>Image</label>
                            <input type="text" ref="image" name="image" placeholder="Enter an image URL"></input>
                        </div>
                        <div className="field">
                            <label>Summary</label>
                            <textarea rows="2" ref="summary" name="summary" placeholder="Enter a summary about yourself"></textarea>
                        </div>
                        <button className="ui green button">Update</button>
                        <div style={{ display: this.state.error ? "block" : "none"}} className="ui error message">{this.state.error}</div>
                        <div style={{ display: this.state.success ? "block" : "none"}} className="ui success message">User updated successfully</div>
                    </form>
                </div>
            );
        }
    }
});
