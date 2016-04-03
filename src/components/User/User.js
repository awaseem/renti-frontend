import React from "react";
import { getUserById } from "../../lib/user";
import { checkAuth, checkUserCreditCard, getCurrentUser } from "../../lib/auth";
import { browserHistory } from "react-router";
import { addUserComment } from "../../lib/feedback";
import FeedbackItem from "../Feedback/FeedbackItem";
import FeedbackForm from "../Feedback/FeedbackForm";
import ErrorPopUp from "../PopUp/PopUp";
import CarItem from "../CarList/CarItem";

export default React.createClass({

    getInitialState: function () {
        return {
            showPopUp: false,
            userData: {},
            userComments: [],
            error: ""
        };
    },

    addComment: function (comment) {
        addUserComment(comment, this.props.params.uid)
            .then((comment) => {
                comment.data.userCreator = getCurrentUser();
                this.setState({
                    userComments: this.state.userComments.concat(comment.data)
                });
            })
            .catch((err) => {
                console.error(err);
            });
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
        getUserById(this.props.params.uid)
            .then((data) => {
                this.setState({
                    userData: data,
                    userComments: data.userFeedback
                });
            })
            .catch((err) => {
                console.log(err);
                err.response.json().then((err) => this.setState({
                    error: err.message
                }));
            });
    },

    render: function () {
        const userData = this.state.userData;
        let userCars;
        let userComments;
        if (userData.cars) {
            userCars = userData.cars.map((car) => {
                return <CarItem key={Math.random()} colour={car.colour}
                                    id={car.license_plate}
                                    uid={car.user_id}
                                    image={car.image}
                                    make={car.make}
                                    model={car.model}
                                    year={car.year}
                                    numberOfSeats={car.number_of_seats}
                                    price={car.price}
                                    rentHandler={this.rentHandler.bind(this, car.license_plate)}
                />;
            });
        }
        if (this.state.userComments) {
            userComments = this.state.userComments.map((feedback) => {
                return <FeedbackItem key={Math.random()} uid={feedback.userCreator.uid}
                            comment={feedback.comment} image={feedback.userCreator.image}
                            username={feedback.userCreator.username}/>;
            });
        }
        return (
            <div>
                <div className="ui grid">
                    <div className="row">
                        <div className="center aligned column">
                            <h1>{userData.first_name} {userData.last_name}</h1>
                            <img className="ui small centered circular image" src={userData.image}/>
                            <h5>username: {userData.username}</h5>
                            <h5>email: {userData.email}</h5>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="centered eight wide column">
                            <h2>Summary</h2>
                            <p>{userData.summary}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="center aligned column">
                            <h2>Cars</h2>
                        </div>
                    </div>
                    <div className="one column row">
                        <div className="centered column">
                            <div className="ui centered cards">
                                {userCars}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="centered eight wide column">
                            <div className="ui items">
                                {userComments}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="centered eight wide column">
                            { checkAuth() ? <FeedbackForm handler={this.addComment}/> : undefined}
                        </div>
                    </div>
                </div>
                <ErrorPopUp show={this.state.showPopUp} heading="Error" message="There seems to be an error!"/>
            </div>
        );
    }

});
