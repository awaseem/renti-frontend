import React from "react";
import CarItem from "./CarItem";
import { getCars } from "../../lib/car";
import { checkAuth, checkUserCreditCard } from "../../lib/auth";
import ErrorPopUp from "../PopUp/PopUp";
import { browserHistory } from "react-router";

export default React.createClass({

    getInitialState: function () {
        return {
            cars: [],
            showPopUp: false,
            message: ""
        };
    },

    rentHandler: function (carId) {
        if (!checkAuth()) {
            return this.setState({
                showPopUp: true,
                message: "noAuth"
            });
        }
        else {
            checkUserCreditCard((valid) => {
                if (valid) {
                    return browserHistory.push(`/rent/${carId}`);
                }
                else {
                    return this.setState({
                        showPopUp: true,
                        message: "noAuth"
                    });
                }
            });
        }
    },

    componentDidMount: function () {
        getCars()
            .then((cars) => {
                this.setState({
                    cars: cars
                });
            })
            .catch((err) => {
                console.error(err);
            });
    },

    render: function () {
        let cars = this.state.cars.map((car) => {
            return <CarItem key={Math.random()} colour={car.colour}
                            id={car.license_plate}
                            uid={car.user_id}
                            image={car.image}
                            make={car.make}
                            model={car.model}
                            year={car.year}
                            numberOfSeats={car.number_of_seats}
                            user={car.users.username}
                            price={car.price}
                            rentHandler={this.rentHandler.bind(this, car.license_plate)}
            />;
        });
        return (
            <div>
                <div className="ui cards">
                    {cars}
                </div>
                <ErrorPopUp show={this.state.showPopUp} heading="Error" message="There seems to be an error!"/>
            </div>
        );
    }

});
