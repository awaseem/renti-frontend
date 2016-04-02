import React from "react";
import CarItem from "./CarItem";
import { getCars } from "../../lib/car";

export default React.createClass({

    getInitialState: function () {
        return {
            cars: []
        };
    },

    componentDidMount: function () {
        getCars()
            .then((cars) => {
                console.log(cars);
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
            />;
        });
        return (
            <div>
                <div className="ui cards">
                    {cars}
                </div>
            </div>
        );
    }

});
