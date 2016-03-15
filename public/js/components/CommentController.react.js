var React = require('react');
var CommentList = require('./Comment.react').CommentList;
var CommentAddForm = require('./Comment.react').CommentAddForm;

const CommentForm = React.createClass({
	getInitialState: function () {
		return {comments: []};
	},
	loadCommentsFromServer: function () {
		var commentURL = this.props.commentsurl + '/' + this.props.postid;
		$.ajax({
	      url: commentURL,
	      dataType: 'json',
	      type: 'GET',
	      success: function (data) {
	        this.setState({comments:data});
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error(this.props.commentsurl, status, err.toString());
	      }.bind(this)
	    });
	},
	postCommentToServer: function (comment) {
		var commentURL = this.props.commentsurl;
		$.ajax({
	      url: commentURL,
	      dataType: 'json',
	      type: 'POST',
	      data: comment,
	      success: function (data) {
	        this.setState({comments:data});
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error(this.props.commentsurl, status, err.toString());
	      }.bind(this)
	    });
	},
	componentDidMount: function () {
		this.loadCommentsFromServer();
	},
	render: function () {
		var commentsForThisPost = this.state.comments.filter( (comment) => {
			return (comment.postId === this.props.postid);
		});
		return (
			<div className="comment-form">
				<h2 id="commentHeader">Comments</h2>
				<CommentList comments={commentsForThisPost} />
				<CommentAddForm postid={this.props.postid} commentSubmit={this.postCommentToServer} />
			</div>
		);
	}
});

module.exports = {CommentForm}