import React from "react";

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
        return (
            <div>
                <div className="ui grid">
                    <div className="row">
                        <div className="center aligned column">
                            <h1>{userData.first_name} {userData.last_name}</h1>
                            <img className="ui small centered circular image" src={userData.image}/>
                            <h5>username: {userData.username}</h5>
                        </div>
                    </div>
                    <div className="ui divider"></div>
                </div>
                <form id="user-edit-form" className="ui form">
                    <div className="equal width fields">
                        <div className="field">
                            <label>Address</label>
                            <input type="text" ref="address" name="address" defaultValue={userData.address} placeholder="Enter an address"></input>
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
                    <div style={{ display: this.props.error ? "block" : "none"}} className="ui error message">{this.props.error}</div>
                    <div style={{ display: this.props.success ? "block" : "none"}} className="ui success message">User updated successfully</div>
                </form>
            </div>
        );
    }
});
