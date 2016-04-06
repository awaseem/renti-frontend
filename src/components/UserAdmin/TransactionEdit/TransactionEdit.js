import React from "react";
import TransactionItem from "./TransactionItem";

export default React.createClass({

    componentDidMount: function () {
    },

    render: function () {
        let transactionOnUserCars = [];
        if (!this.props.userData || !this.props.userTransactions) {
            return <div>Loading user data</div>;
        }

        this.props.userData.cars.forEach( (car) => {
            console.log("For each of the cars");
            console.log(car);
            if (car.transactions.length == 0) {
                return;
            }
            transactionOnUserCars = transactionOnUserCars.concat(
                car.transactions.map((transaction) => {
                    return <TransactionItem
                        key={transaction.tid}
                        approved={!transaction.pending}
                        userCanApprove
                        image={car.image}
                        license={car.license_plate}
                        year={car.year}
                        make={car.make}
                        model={car.model}
                        uid={car.user_id}
                        carOwner={this.props.userData.username}
                        dateIn={transaction.date_in}
                        dateOut={transaction.date_out}
                        />;
                }));
        });
        if (transactionOnUserCars.length === 0) {
            transactionOnUserCars =
                <div className="ui message">
                    <div className="header">
                    No transactions!
                    </div>
                    <p>Nobody is renting your cars. Check back later.</p>
                </div>;
        }

        let userTransactions = [];
        if (this.props.userTransactions.length === 0) {
            userTransactions =
                <div className="ui message">
                    <div className="header">
                    No transactions!
                    </div>
                    <p>You don't have any transactions. Rent a vehicle to see it here.</p>
                </div>;
        } else {
            userTransactions = this.props.userTransactions.map((transaction) => {
                return <TransactionItem
                    key={transaction.tid}
                    approved={!transaction.pending}
                    image={transaction.car.image}
                    license={transaction.car_id}
                    year={transaction.car.year}
                    make={transaction.car.make}
                    model={transaction.car.model}
                    uid={transaction.car.user_id}
                    carOwner={transaction.car.users.username}
                    dateIn={transaction.date_in}
                    dateOut={transaction.date_out}
                    />;
            });
        }
        return (
            <div className="ui two column grid">
                <div className="column">
                    <h2>Loans on your car</h2>
                    <div className="ui divided items">
                        {transactionOnUserCars}
                    </div>
                </div>
                <div className="column">
                    <h2>Your renting history</h2>
                    <div className  ="ui divided items">
                        {userTransactions}
                    </div>
                </div>
            </div>
        );
    }
});
