import React from "react";
import CarItem from "./CarItem";
import { getCars } from "../../lib/car";
import { checkAuth, checkUserCreditCard } from "../../lib/auth";
import ErrorPopUp from "../PopUp/PopUp";
import { browserHistory } from "react-router";
import fuse from "fuse.js";

export default React.createClass({

    getInitialState: function () {
        this.indexedCars = undefined;
        return {
            carsUnchanged: [],
            cars: [],
            showPopUp: false,
            message: ""
        };
    },

    handleSearch: function (e) {
        let searchTerm = e.target.value.trim();
        if (searchTerm) {
            this.setState({
                cars: this.indexedCars.search(searchTerm)
            });
        }
        else {
            this.setState({
                cars: this.state.carsUnchanged
            });
        }
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
                    carsUnchanged: cars,
                    cars: cars
                });
                const carsToIndex = this.state.cars.map((car) => {
                    let transformedCar = car;
                    transformedCar.price = car.price.toString();
                    transformedCar.year = car.year.toString();
                    transformedCar.number_of_seats = car.number_of_seats.toString();
                    return transformedCar;
                });
                this.indexedCars = new fuse(carsToIndex, { keys: ["model", "make", "price", "number_of_seats", "colour", "users.address", "year"] });
            })
            .catch((err) => {
                console.error(err);
            });
    },

    render: function () {
        let cars = this.state.cars.map((car) => {
            return <CarItem key={car.license_plate} colour={car.colour}
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
                <div className="ui fluid big icon input">
                    <input onChange={this.handleSearch} type="text" placeholder="Search for your perfect car..."/>
                    <i className="search icon"></i>
                </div>
                <div className="ui hidden divider"></div>
                <div className="ui centered cards">
                    {cars}
                </div>
                <ErrorPopUp show={this.state.showPopUp} heading="Error" message="There seems to be an error!"/>
            </div>
        );
    }

});
