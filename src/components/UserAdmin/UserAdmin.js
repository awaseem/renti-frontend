import React from "react";
import { checkAuth, getCurrentUser } from "../../lib/auth";
import { getUserById, updateUser } from "../../lib/user";
import { getTransactionsForUser, approveTransaction} from "../../lib/transaction";
import UserEdit from "./UserEdit/UserEdit";
import CarItem from "../CarList/CarItem";
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

    carEditFormHandler: function () {

    },

    transactionApprovalHandler: function (tid) {
        approveTransaction(tid);
        let userData = this.state.userData;
        userData.cars.forEach((car) => {
            car.transactions.forEach( (transaction) => {
                if (transaction.tid == tid) {
                    transaction.pending = 0;
                }
            });
        });
        this.setState({
            userData: userData
        });
    },

    render: function () {
        const { cars } = this.state.userData;
        console.log(cars);
        if (!checkAuth() || this.state.error === "noCurrentUser") {
            return (
                <div>
                    <h1>You must be logged in to view this page.</h1>
                </div>
            );
        } else {
            let carItems;
            if (cars) {
                carItems = cars.map((car) => {
                    return <div key={car.license_plate} className="column"><CarItem colour={car.colour}
                            id={car.license_plate}
                            uid={car.user_id}
                            image={car.image}
                            make={car.make}
                            model={car.model}
                            year={car.year}
                            numberOfSeats={car.number_of_seats}
                            price={car.price}
                            carData={car}
                            onEdit={this.carEditFormHandler}
                    /></div>;
                });
            }
            return (
                <div>
                    <UserEdit success={this.state.userFormUpdated}
                        userData={this.state.userData}
                        error={this.state.formError}
                        handleFormSubmit={this.userFormHandler}/>
                    <h2>Edit Cars</h2>
                    <div className="ui divider"></div>
                    <div className="ui three column grid">
                        {carItems}
                    </div>
                    <div className="ui divider"></div>
                    <TransactionEdit
                        userData={this.state.userData}
                        userTransactions={this.state.userTransactions}
                        transactionApprovalHandler={this.transactionApprovalHandler}/>
                </div>
            );
        }
    }
});
