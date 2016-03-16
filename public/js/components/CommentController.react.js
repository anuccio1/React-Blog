var React = require('react');
var CommentList = require('./Comment.react').CommentList;
var CommentAddForm = require('./Comment.react').CommentAddForm;
var CommentStore 	= require('../stores/CommentStore');
var CommentActions = require('../actions/CommentActions');

function getCommentState (postid) {
  return {
    allComments: CommentStore.getAll(postid)
  };
}
const CommentForm = React.createClass({

	getInitialState: function () {
		return getCommentState();
	},
	componentWillMount: function () {
		CommentActions.load(this.props.postid);	//load posts from server
	},
	componentDidMount: function () {
		CommentStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function () {
		CommentStore.removeChangeListener(this._onChange);
	},
	render: function () {
		return (
			<div className="comment-form">
				<h2 id="commentHeader">Comments</h2>
				<CommentList comments={this.state.allComments} />
				<CommentAddForm postid={this.props.postid} commentSubmit={this.postCommentToServer} />
			</div>
		);
	},
	_onChange: function () {
		this.setState(getCommentState(this.props.postid));
	}
});

module.exports = CommentForm;