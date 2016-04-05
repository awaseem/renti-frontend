import React from "react";
import { checkAuth, getCurrentUser } from "../../lib/auth";
import { getUserById, updateUser } from "../../lib/user";
import UserEdit from "./UserEdit/UserEdit";
import TransactionEdit from "./TransactionEdit/TransactionEdit";

export default React.createClass({

    getInitialState: function () {
        return {
            userData: "",
            userFormUpdated: false,
            formError: ""
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
        })
        .catch( (err) => {
            console.error(err);
            this.setState({
                error: "noCurrentUser"
            });
        });

    },

    userFormHandler: function (address, email, image, summary) {
        this.setState({
            userFormUpdated: false,
            formError: ""
        });
        updateUser(this.state.userData.uid, address, email, image, summary)
        .then( (response) => {
            this.setState({
                userFormUpdated: true
            });
        })
        .catch( (err) => {
            console.error(err);
            this.setState({
                formError: "Error: Unable to update user"
            });
        });
    },

    render: function () {
        const userData = this.state.userData;
        if (this.state.error === "noCurrentUser") {
            console.log("displaying popup");
            return (
                <div>
                    <h1>You must be logged in to view this page.</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <UserEdit success={this.state.userFormUpdated}
                        userData={this.state.userData}
                        error={this.state.formError}
                        handleFormSubmit={this.userFormHandler}/>
                    <div className="ui divider"></div>
                    <TransactionEdit/>
                </div>
            );
        }
    }
});
