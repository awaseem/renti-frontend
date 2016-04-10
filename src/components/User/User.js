import React from "react";
import { getUserById } from "../../lib/user";
import { checkAuth, checkUserCreditCard, getCurrentUser } from "../../lib/auth";
import { browserHistory } from "react-router";
import { addUserComment } from "../../lib/feedback";
import FeedbackItem from "../Feedback/FeedbackItem";
import FeedbackForm from "../Feedback/FeedbackForm";
import CarItem from "../CarList/CarItem";
import sw from "sweetalert";

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            userData: {},
            userComments: [],
            error: false
        };
    },

    addComment: function (comment, ref) {
        addUserComment(comment, this.props.params.uid)
            .then((comment) => {
                comment.data.userCreator = getCurrentUser();
                this.setState({
                    userComments: this.state.userComments.concat(comment.data)
                });
                ref.value = "";
            })
            .catch((err) => {
                console.error(err);
            });
    },

    rentHandler: function (carId) {
        if (!checkAuth()) {
            sw("Oops...", "You need to be logged in to rent cars!", "error");
        }
        else {
            checkUserCreditCard((valid) => {
                if (valid) {
                    this.context.router.push(`rent/${carId}`);
                }
                else {
                    sw("Oops...", "You need a valid credit card!", "error");
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
                this.setState({
                    error: true
                });
            });
    },

    render: function () {
        if (this.state.error) {
            return ( <div>No user found</div> );
        }
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
                <div className="ui stackable two column center aligned padded grid">
                    <div className="six wide column">
                        <h1>{userData.first_name} {userData.last_name}</h1>
                        <img className="ui small centered circular image" src={userData.image}/>
                        <div className="ui segments">
                            <div className="ui left aligned segment">
                                <h4 className="ui header">Information</h4>
                                <p>Username: {userData.username}</p>
                                <p>Email: {userData.email}</p>
                            </div>
                            <div className="ui left aligned segment">
                                <h4 className="ui header">Summary</h4>
                                <p>{userData.summary}</p>
                            </div>
                        </div>
                    </div>
                    <div className="ten wide column">
                            <div className="ui centered cards">
                                {userCars}
                            </div>
                    </div>
                    <div className="left aligned eight wide column">
                        <div className="ui comments">
                            {userComments}
                        </div>
                        { checkAuth() ? <FeedbackForm handler={this.addComment}/> : undefined}
                    </div>
                </div>
        );
    }

});
