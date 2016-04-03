import React from "react";

export default React.createClass({

    componentDidMount: function () {
        $("#comment-box")
            .form({
                on: "blur",
                fields: {
                    comment: "empty"
                },
                inline: true
            });
    },

    submit: function (e) {
        e.preventDefault();
        const comment = this.refs.comment.value.trim();
        this.props.handler(comment, this.refs.comment);
    },

    render: function () {
        return (
            <form id="comment-box" className="ui form" onSubmit={this.submit}>
                <div className="field">
                    <label>Comment</label>
                    <textarea name="comment" ref="comment" rows="2"></textarea>
                </div>
                <div className="field">
                    <input type="submit" className="ui green button"/>
                </div>
            </form>
        );
    }

});
