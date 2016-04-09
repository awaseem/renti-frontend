import React from "react";
import {Link} from "react-router";
import moment from "moment";

export default React.createClass({

    handleApproveClick: function() {
        this.props.transactionApprovalHandler(this.props.tid);
    },

    handleDeleteClick: function () {
        this.props.transactionDeleteHandler(this.props.tid);
    },

    render: function () {
        let transactionState = "";
        if (this.props.approved) {
            transactionState =
                <div>
                    <i className="large green checkmark icon"></i> Approved
                </div>;
        } else {
            if (this.props.userCanApprove) {
                transactionState =
                    <div onClick={this.handleApproveClick} className="ui basic green button">Approve</div>;
            } else {
                transactionState =
                    <div>
                        <i className="large disabled checkmark icon"></i> Approval Pending
                    </div>;
            }
        }
        return (
            <div className="item">
                <div className="image">
                    <img src={this.props.image}/>
                </div>
                <div className="content">
                    <Link to={`/car/${this.props.license}`} className="header">{this.props.year} {this.props.make} {this.props.model}</Link>
                    <div className="ui right floated statistic">
                        <div className="value">
                            ${this.props.price}
                        </div>
                    </div>
                    <div className="meta">
                        Renter: <Link to={`/user/${this.props.renter.uid}`}><span className="date">{this.props.renter.username}</span></Link>
                    </div>
                    <div className="description">
                        Date out: {moment.unix(this.props.dateIn).format("YYYY-MM-DD")} <br/>
                        Date back: {moment.unix(this.props.dateOut).format("YYYY-MM-DD")}
                    </div>
                    <div className="extra">
                        {transactionState}
                        <button onClick={this.handleDeleteClick} className="ui basic red button">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
});
