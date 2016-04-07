import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import CarItem from "../CarList/CarItem";
import { getCurrentUser } from "../../lib/auth";
import { createTransaction, getTransactions } from "../../lib/transaction";
import { getCar } from "../../lib/car";
import { browserHistory } from "react-router";

require("react-datepicker/dist/react-datepicker.css");

function checkDateValidity() {
    if (this.state.startDate.unix() > this.state.endDate.unix()) {
        this.setState({
            error: "Invalid date range, start date can't be after end date"
        });
        return false;
    }
    for (let day of this.state.exclusionDates) {
        if (day.unix() >= this.state.startDate.unix() && day.unix() <= this.state.endDate.unix()) {
            this.setState({
                error: "Invalid date range, range is over booked interval"
            });
            return false;
        }
    }
    return true;
};

let carRate = 0;

function getCarPrice(startDate, endDate) {
    const lastDate = moment(endDate);
    const duration = moment.duration(lastDate.diff(startDate, "days"), "days");
    console.log(duration);
    const price = (duration.asDays() + 1) * carRate;
    if (price <= 0.0) {
        return "N/A";
    }
    return price;
}

export default React.createClass({
    getInitialState: function () {
        return {
            startDate: moment(),
            endDate: moment().add(1, "days"),
            currentUser: "",
            price: 0,
            exclusionDates: [],
            error: "",
            carData: ""
        };
    },

    onSubmit: function (e) {
        e.preventDefault();

        if (checkDateValidity.bind(this)()) {
            this.setState({
                error: ""
            });
        } else {
            return;
        }

        createTransaction(
            this.state.currentUser.uid,
            this.state.startDate.unix(),
            this.state.endDate.unix(),
            this.props.params.plate,
            this.state.price)
        .then( () => {
            // redirect to user admin page after login
            browserHistory.push("/user/admin");
        })
        .catch( (err) => {
            this.setState({
                error: "Transaction is not valid."
            });
            console.log(err);
            return err.response.json().then( (value) => {
                Object.keys(value.error).map((error) => {
                    console.log(value.error[error]);
                });
            });
        } );
    },

    componentDidMount: function () {
        this.setState({
            currentUser: getCurrentUser()
        });
        getTransactions(this.props.params.plate)
        .then( (transactions) => {
            let exclusionDates = [];
            transactions.forEach( (transaction) => {
                let day = moment.unix(transaction.date_in);
                const lastDay = moment.unix(transaction.date_out);
                while (day.unix() <= lastDay.unix()) {
                    exclusionDates.push(moment(day));
                    day.add(1, "day");
                }
            });
            this.setState({
                exclusionDates: exclusionDates
            });
        })
        .catch( (err) => {
            console.error(err);
        });

        getCar(this.props.params.plate)
        .then( (car) => {
            carRate = car.price;
            this.setState({
                price: getCarPrice(this.state.startDate, this.state.endDate),
                carData: car
            });
        })
        .catch( (err) => {
            console.error(err);
            this.setState({
                error: "noCarFound"
            });
        });

        $("#create_transaction-form")
            .form({
                on: "blur",
                fields: {
                },
                inline: true,
                onSuccess: this.onSubmit
            });
    },

    handleChangeStart: function(date) {
        this.setState({
            startDate: date
        });
        this.setState({
            price: getCarPrice(date, this.state.endDate)
        });
    },

    handleChangeEnd: function(date) {
        this.setState({
            endDate: date
        });
        this.setState({
            price: getCarPrice(this.state.startDate, date)
        });
    },

    render: function () {
        if (this.state.error === "noCarFound") {
            return (
                <div>No car found</div>
            );
        }
        const car = this.state.carData;
        let carItem;
        if (car) {
            carItem =  <CarItem colour={car.colour}
                                id={car.license_plate}
                                uid={car.user_id}
                                image={car.image}
                                make={car.make}
                                model={car.model}
                                year={car.year}
                                numberOfSeats={car.number_of_seats}
                                user={car.users.username}
                                price={car.price} />;
        }
        return (
            <div>
                <br/>
                <div className="ui grid">
                    <div className="centered row">
                        {carItem}
                    </div>
                    <div className="centered row">
                        <div className="ui statistic">
                            <div className="value">
                                ${this.state.price}
                            </div>
                            <div className="label">Price</div>
                        </div>
                    </div>
                </div>
                <br/>
                <form id="create_transaction-form" className="ui form">
                    <div className="two fields">
                        <div className="field">
                            <label>Start Date</label>
                            <DatePicker
                                selected={this.state.startDate}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                minDate={moment()}
                                excludeDates={this.state.exclusionDates}
                                onChange={this.handleChangeStart} />
                        </div>

                        <div className="field">
                            <label>End Date</label>
                            <DatePicker
                                selected={this.state.endDate}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                minDate={this.state.startDate}
                                excludeDates={this.state.exclusionDates}
                                onChange={this.handleChangeEnd} />
                        </div>
                    </div>
                    <div>
                        <button className="ui green button">Rent</button>
                    </div>
                    <div style={{ display: this.state.error ? "block" : "none"}} className="ui error message">{this.state.error}</div>
                </form>
            </div>
        );
    }
});
