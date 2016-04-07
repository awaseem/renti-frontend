import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { createCreditCard } from "../../lib/creditCard";
import { getCurrentUser } from "../../lib/auth";
import { browserHistory } from "react-router";

require("react-datepicker/dist/react-datepicker.css");

export default React.createClass({

    getInitialState: function () {
        return {
            expiryDate: moment(),
            error: ""
        };
    },

    onSubmit: function (e) {
        e.preventDefault();
        this.setState({
            error: ""
        });
        const currentUser = getCurrentUser();
        createCreditCard(
            this.refs.creditCardNumber.value.trim(),
            this.refs.cvv.value.trim(),
            this.state.expiryDate.format("MMYY"))
        .then( (data) =>
            console.log(data)
        )
        .then( () => {
            // redirect to user admin page after login
            browserHistory.push("/user/admin");
        })
        .catch( (err) => {
            this.setState({
                error: "Unable to add credit card. Try a different card."
            });
            return err.response.json().then( (value) => {
                Object.keys(value.error).map((error) => {
                    console.log(value.error[error]);
                });
            });
        } );
    },

    componentDidMount: function () {
        $("#create_credit_card-form")
            .form({
                on: "blur",
                fields: {
                    creditCardNumber: ["creditCard", "empty"],
                    cvv: ["exactLength[3]", "integer", "empty"]
                },
                inline: true,
                onSuccess: this.onSubmit
            });
    },

    handleExpiryDateChange: function(date) {
        this.setState({
            expiryDate: date
        });
    },

    render: function () {
        return (
            <div className="ui centered grid">
                <div className="column">
                    <div className="ui segment">
                        <form id="create_credit_card-form" className="ui form">
                            <div className="field">
                                <label>Credit Card Number</label>
                                <input type="text" ref="creditCardNumber" name="creditCardNumber" placeholder="Enter Credit Card"></input>
                            </div>
                            <div className="field">
                                <label>CVV</label>
                                <input type="text" ref="cvv" name="cvv" placeholder="###"></input>
                            </div>
                            <div className="field">
                                <label>Expiry Date</label>
                                <DatePicker
                                    selected={this.state.expiryDate}
                                    showYearDropdown
                                    onChange={this.handleExpiryDateChange} />
                            </div>
                            <button className="ui green button">Submit</button>
                            <div style={{ display: this.state.error ? "block" : "none"}} className="ui error message">{this.state.error}</div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
