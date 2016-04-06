import React from "react";
import { checkAuth, getCurrentUser } from "../../lib/auth";
import { getUserById, updateUser } from "../../lib/user";
import { getTransactionsForUser } from "../../lib/transaction";
import UserEdit from "./UserEdit/UserEdit";
import TransactionEdit from "./TransactionEdit/TransactionEdit";

export default React.createClass({

    getInitialState: function () {
        return {
            userData: "",
            userTransactions: "",
            userFormUpdated: false,
            formError: ""
        };
    },

    componentDidMount: function () {
        const tokenData = getCurrentUser();

        getUserById(tokenData.uid)
        .then( (data) => {
            console.log(data);
            this.setState({
                userData: data
            });
        })
        .catch( (err) => {
            console.log(err);
            this.setState({
                error: "noCurrentUser"
            });
        });

        getTransactionsForUser(tokenData.uid)
        .then( (userTransactions) => {
            console.log(userTransactions);
            this.setState({
                userTransactions: userTransactions
            });
        })
        .catch( (err) => {
            console.log(err);
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
            this.setState({
                formError: "Error: Unable to update user"
            });
        });
    },

    render: function () {
        if (!checkAuth() || this.state.error === "noCurrentUser") {
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
                    <TransactionEdit
                        userData={this.state.userData}
                        userTransactions={this.state.userTransactions}/>
                </div>
            );
        }
    }
});
