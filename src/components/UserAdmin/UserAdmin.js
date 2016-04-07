import React from "react";
import { checkAuth, getCurrentUser } from "../../lib/auth";
import { getUserById, updateUser } from "../../lib/user";
import { getTransactionsForUser, approveTransaction} from "../../lib/transaction";
import { editCar, deleteCar } from "../../lib/car";
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
            console.error(err);
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
            this.setState({
                formError: "Error: Unable to update user"
            });
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
                            handleEdit={this.carEditFormHandler}
                            handleDelete={this.carDeleteHandler}
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
                    <div className="ui three column centered grid">
                        {carItems.length !== 0 ? carItems :
                            <div>
                                <div className="ui hidden divider"></div>
                                <div className="ui message">
                                    <div className="header">
                                        No transactions!
                                    </div>
                                    <p>You don't have any transactions. Rent a vehicle to see it here.</p>
                                </div>
                                <div className="ui hidden divider"></div>
                                <div className="ui hidden divider"></div>
                            </div>
                        }
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
