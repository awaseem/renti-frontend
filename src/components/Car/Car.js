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
            <div className="ui stackable two column center aligned padded grid">
                <div className="row">
                    <h1>{carData.year} {carData.make} {carData.model}</h1>
                </div>
                <div className="eight wide column">
                    <img className="ui big rounded centered image" style={{borderBottomRightRadius: 0, borderBottomLeftRadius: 0}} src={carData.image}/>
                    <button className="fluid ui blue bottom attached button" onClick={this.rentHandler}>Rent This Vehicle</button>
                </div>
                <div className="eight wide column">
                    <div className="ui segments">
                        <div className="ui left aligned segment">
                            <h4 className="ui header">Information</h4>
                            <p>Price: ${carData.price}</p>
                            <p>Owner: <Link to={`/user/${carData.user_id}`}><span>{carData.users ? carData.users.username : undefined}</span></Link></p>
                            <p>Seats: {carData.number_of_seats}</p>
                            <p>Color: {carData.colour}</p>
                        </div>
                        <div className="ui left aligned segment">
                            <h4 className="ui header">Summary</h4>
                            <p>{carData.summary}</p>
                        </div>
                    </div>
                </div>
                <div className="left aligned eight wide column">
                    <div className="ui comments">
                        {carComments}
                    </div>
                    { checkAuth() ? <FeedbackForm handler={this.addComment}/> : undefined}
                </div>
            </div>
        );
    }

});
