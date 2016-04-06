import React from "react";
import {Link} from "react-router";
import moment from "moment";

export default React.createClass({

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
                    <div className="ui basic green button">Approve</div>;
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
                    <div className="meta">
                        <Link to={`/user/${this.props.uid}`}><span className="date">{this.props.carOwner}</span></Link>
                    </div>
                    <div className="description">
                        Date out: {moment.unix(this.props.dateIn).format("YYYY-MM-DD")} <br/>
                        Date back: {moment.unix(this.props.dateOut).format("YYYY-MM-DD")}
                    </div>
                    <div className="extra">
                        {transactionState}
                    </div>
                </div>
            </div>
        );
    }
});
