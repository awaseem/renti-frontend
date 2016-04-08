import React from "react";
import { Link } from "react-router";
import CreateCreditCard from "../../CreateCreditCard/CreateCreditCard";
import AddCar from "../../AddCar/AddCar";
export default React.createClass({

    componentDidMount: function () {
        $("#user-edit-form")
            .form({
                on: "blur",
                fields: {
                    image: ["url", "empty"],
                    address: "empty",
                    summary: "empty",
                    emailAddress: ["email", "empty"]
                },
                inline: true,
                onSuccess: this.handleFormSubmit
            });
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (!prevProps.userData && this.props.userData) {
            this.refs.image.value = this.props.userData.image;
            this.refs.address.value = this.props.userData.address;
            this.refs.summary.value = this.props.userData.summary;
            this.refs.emailAddress.value = this.props.userData.email;
        }
    },

    handleFormSubmit: function(e) {
        e.preventDefault();
        this.props.handleFormSubmit(
            this.refs.address.value.trim(),
            this.refs.emailAddress.value.trim(),
            this.refs.image.value.trim(),
            this.refs.summary.value.trim());
    },

    render: function () {
        const userData = this.props.userData;
        const creditCardButton = this.props.hasCreditCard ?
            <div className="ui green button" onClick={this.props.replaceCreditCardHandler}>Replace Credit Card</div>
            : <div className="ui green button" onClick={this.props.addCreditCardHandler}>Add Credit Card</div>;
        return (
        <div className="six wide column">
            <h1>Your Profile</h1>
            <img className="ui small centered circular image" src={userData.image}/>
            <div className="ui segments" style={{ display: this.props.formOpenState === "editUserForm" ? "none" : "block"}}>
                <div className="ui left aligned segment">
                    <h4 className="ui header">Information</h4>
                    <p>Name: {userData.first_name} {userData.last_name}</p>
                    <p>Username: <Link to={`/user/${userData.uid}`} className="header">{userData.username}</Link></p>
                    <p>Email: {userData.email}</p>
                    <p>Address: {userData.address}</p>
                </div>
                <div className="ui left aligned segment">
                    <h4 className="ui header">Summary</h4>
                    <p>{userData.summary}</p>
                </div>
            </div>

            <div className="ui segment" style={{ display: this.props.formOpenState === "editUserForm" ? "block" : "none"}}>
                <form id="user-edit-form" className="ui form" style={{ display: this.props.formOpenState === "editUserForm" ? "block" : "none"}} >
                    <div className="equal width fields">
                        <div className="field">
                            <label>Address</label>
                            <input type="text" ref="address" name="address" placeholder="Enter an address"></input>
                        </div>
                        <div className="field">
                            <label>Email Address</label>
                            <input type="text" ref="emailAddress" name="emailAddress" placeholder="Enter your email"></input>
                        </div>
                    </div>
                    <div className="field">
                        <label>Image</label>
                        <input type="text" ref="image" name="image" placeholder="Enter an image URL"></input>
                    </div>
                    <div className="field">
                        <label>Summary</label>
                        <textarea rows="2" ref="summary" name="summary" placeholder="Enter a summary about yourself"></textarea>
                    </div>
                    <button className="ui green button">Update</button>
                    <div className="ui red button" onClick={this.props.hideUserEditHandler}>Close</div>
                    <div style={{ display: this.props.error ? "block" : "none"}} className="ui error message">{this.props.error}</div>
                </form>
                <div style={{ display: this.props.success ? "block" : "none"}} className="ui success message">User updated successfully</div>
            </div>
            
            <div className="ui green button" onClick={this.props.showEditUserHandler}>Edit User</div>
            {creditCardButton}
            <div className="ui green button" onClick={this.props.addCarHandler}>Add Car</div>
        </div>
        );
    }
});
