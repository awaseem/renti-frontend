import React from "react";
import { checkAuth, getCurrentUser, checkUserCreditCard } from "../../lib/auth";
import { getUserById, updateUser } from "../../lib/user";
import { getTransactionsForUser, approveTransaction, deleteTransaction } from "../../lib/transaction";
import { editCar, deleteCar } from "../../lib/car";
import { createCreditCard, deleteCreditCard } from "../../lib/creditCard";
import { browserHistory } from "react-router";
import UserEdit from "./UserEdit/UserEdit";
import CarItem from "../CarList/CarItem";
import TransactionEdit from "./TransactionEdit/TransactionEdit";
import sw from "sweetalert";

export default React.createClass({

    getInitialState: function () {
        return {
            userData: "",
            userTransactions: "",
            userFormUpdated: false,
            hasCreditCard: false,
            formOpenState: "",
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
            console.error(err);
            this.setState({
                error: "noCurrentUser"
            });
        });

        checkUserCreditCard((hasCard) => {
            this.setState({
                hasCreditCard: hasCard
            });
        });

        getTransactionsForUser(tokenData.uid)
        .then( (userTransactions) => {
            this.setState({
                userTransactions: userTransactions
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
            let userData = this.state.userData;
            userData.address = address;
            userData.email = email;
            userData.image = image;
            userData.summary = summary;
            this.setState({
                userData: userData,
                formOpenState: "",
                userFormUpdated: true
            });
        })
        .catch( (err) => {
            this.setState({
                formError: "Error: Unable to update user"
            });
        });
    },

    showEditUserHandler: function() {
        this.setState({
            userFormUpdated: false,
            formOpenState: "editUserForm"
        });
    },

    replaceCreditCardHandler: function() {
        deleteCreditCard()
        .then(() => {
            browserHistory.push("/CreateCreditCard");
        })
        .catch( (err) => {
            console.error(err);
        });
    },

    addCreditCardHandler: function() {
        browserHistory.push("/CreateCreditCard");
    },

    addCarHandler: function() {
        browserHistory.push("/newCar");
    },

    hideUserEditHandler: function() {
        this.setState({
            formError: "",
            formOpenState: ""
        });
    },

    carEditFormHandler: function (carId, refs) {
        const inputValues = Object.keys(refs).map((value) => {
            return refs[value].value.trim();
        });
        // spearc the values of the form to editCar
        editCar(carId, ...inputValues)
            .then((result) => {
                // Iterate through the user data until a match is found with the edited car
                let userData = this.state.userData;
                userData.cars.forEach((car, index) => {
                    if (car.license_plate === result.data.license_plate) {
                        // update userData with updated results.
                        Object.keys(result.data).map((key) => userData.cars[index][key] = result.data[key] );
                    }
                });
                this.setState({
                    userData: userData
                });
            })
            .catch((err) => {
                console.error(err);
            });
    },

    carDeleteHandler: function (carId) {
        deleteCar(carId)
            .then(() => {
                let userData = this.state.userData;
                let transactions = this.state.userTransactions;
                userData.cars = userData.cars.filter((car) => car.license_plate !== carId);
                transactions= transactions.filter((tran) => tran.car_id !== carId);
                this.setState({
                    userTransactions: transactions,
                    userData: userData
                });
            })
            .catch((err) => {
                console.error(err);
            });
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

    transactionDeleteHandler: function (tid) {
        return deleteTransaction(tid)
            .then(() => {
                this.setState({
                    userTransactions: this.state.userTransactions.filter( transaction => transaction.tid !== tid)
                });
            })
            .catch((err) => {
                sw("Oops...", "Unknown error has occured", "error");
            });
    },

    render: function () {
        const { cars } = this.state.userData;
        if (!checkAuth() || this.state.error === "noCurrentUser") {
            return (
                <div>
                    <h1>You must be logged in to view this page.</h1>
                </div>
            );
        } else {
            let carItems = [];
            if (cars) {
                carItems = cars.map((car) => {
                    return <CarItem key={car.license_plate} colour={car.colour}
                            id={car.license_plate}
                            uid={car.user_id}
                            image={car.image}
                            make={car.make}
                            model={car.model}
                            year={car.year}
                            numberOfSeats={car.number_of_seats}
                            price={car.price}
                            carData={car}
                            handleEdit={this.carEditFormHandler}
                            handleDelete={this.carDeleteHandler}
                    />;
                });
            }
            return (
            <div className="ui stackable two column center aligned padded grid">
                <UserEdit success={this.state.userFormUpdated}
                 userData={this.state.userData}
                 error={this.state.formError}
                 handleFormSubmit={this.userFormHandler}
                 hasCreditCard={this.state.hasCreditCard}
                 showEditUserHandler={this.showEditUserHandler}
                 replaceCreditCardHandler={this.replaceCreditCardHandler}
                 addCreditCardHandler={this.addCreditCardHandler}
                 addCarHandler={this.addCarHandler}
                 hideUserEditHandler={this.hideUserEditHandler}
                 formOpenState={this.state.formOpenState}/>
                <div className="ten wide column">
                    <h1>Your Vehicles</h1>
                    {carItems.length !== 0 ? <div className="ui centered cards">
                        {carItems}
                    </div>:
                    <div>
                        <div className="ui hidden divider"></div>
                        <div className="ui message">
                            <div className="header">
                                No Cars!
                            </div>
                            <p>You don't have any cars. Why not add your own car :)</p>
                        </div>
                        <div className="ui hidden divider"></div>
                        <div className="ui hidden divider"></div>
                    </div>
                    }
                </div>
                <div className="sixteen wide column">
                    <TransactionEdit
                     userData={this.state.userData}
                     userTransactions={this.state.userTransactions}
                     transactionApprovalHandler={this.transactionApprovalHandler}
                     transactionDeleteHandler={this.transactionDeleteHandler}/>
                </div>
            </div>
            );
        }
    }
});
