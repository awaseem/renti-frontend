import React from "react";
import { Link } from "react-router";
import { getCar } from "../../lib/car";
import { checkAuth, checkUserCreditCard, getCurrentUser } from "../../lib/auth";
import { browserHistory } from "react-router";
import { addCarComment } from "../../lib/feedback";
import FeedbackItem from "../Feedback/FeedbackItem";
import FeedbackForm from "../Feedback/FeedbackForm";
import sw from "sweetalert";

export default React.createClass({

    getInitialState: function () {
        return {
            carData: {},
            carComments: [],
            error: false
        };
    },

    addComment: function (comment, ref) {
        addCarComment(comment, this.props.params.plate)
            .then((comment) => {
                comment.data.userCreator = getCurrentUser();
                this.setState({
                    carComments: this.state.carComments.concat(comment.data)
                });
                ref.value = "";
            })
            .catch((err) => {
                sw("Sorry :(", "Unkown error has occured!", "error");
            });
    },

    rentHandler: function () {
        if (!checkAuth()) {
            sw("Oops...", "You need to be logged in to rent cars!", "error");
        }
        else {
            checkUserCreditCard((valid) => {
                if (valid) {
                    return browserHistory.push(`/rent/${this.props.params.plate}`);
                }
                else {
                    sw("Oops...", "You need a valid credit card!", "error");
                }
            });
        }
    },

    componentDidMount: function () {
        getCar(this.props.params.plate)
            .then((data) => {
                this.setState({
                    carData: data,
                    carComments: data.carFeedback
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
            return ( <div>No car found</div> );
        }
        const carData = this.state.carData;
        let carComments;
        if (this.state.carComments) {
            carComments = this.state.carComments.map((feedback) => {
                return <FeedbackItem key={Math.random()} uid={feedback.userCreator.uid}
                            comment={feedback.comment} image={feedback.userCreator.image}
                            username={feedback.userCreator.username}/>;
            });
        }
        return (
            <div className="ui container">
                <div className="ui grid">
                    <div className="row">
                        <div className="center aligned column">
                            <h1>{carData.year} {carData.make} {carData.model}</h1>
                            <img className="ui large rounded centered image" src={carData.image}/>
                            <h5 className="ui grey header">price: ${carData.price}</h5>
                            <h5 className="ui grey header">belongs to: <Link to={`/user/${carData.user_id}`}><span>{carData.users ? carData.users.username : undefined}</span></Link></h5>
                            <h5 className="ui grey header">number of seats: {carData.number_of_seats}</h5>
                            <h5 className="ui grey header">colour: {carData.colour}</h5>
                            <button className="ui medium blue button" onClick={this.rentHandler}>Rent</button>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="center aligned column">
                            <h2>Summary</h2>
                            <p>{carData.summary}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="centered eight wide column">
                            <div className="ui items">
                                {carComments}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="centered eight wide column">
                            { checkAuth() ? <FeedbackForm handler={this.addComment}/> : undefined}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});
