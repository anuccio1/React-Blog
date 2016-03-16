var React    = require('react');

/* COMMENT COMPONENTS */

const Comment = React.createClass({
	render: function () {
		return (
			<div className="comment">
				<div className="comment-author">
					<i className="comment-avatar fa fa-user fa-3x"></i>
					{this.props.author}
				</div>
				<div className="comment-body">
					{this.props.text}
				</div>
			</div>
		);
	}
})

const CommentList = React.createClass({
	render: function () {
		var commentList = this.props.comments.map(function (comment) {
			return (
				<Comment key={comment.id} author={comment.author} text= {comment.text} date={comment.date} />
			);
		});
		return ( 
			<div className="comment-list">
				{commentList}
			</div>
		);
	}
});

const CommentAddForm = React.createClass({
	getInitialState: function () {
		return {author:'', text: ''}
	},
	handleContentChange: function (e) {
		this.setState({text: e.target.value});
	},
	handleAuthorChange: function (e) {
		this.setState({author: e.target.value});
	},
	handleSubmit: function (e) {
		e.preventDefault();

		var author = this.state.author.trim();
		var text = this.state.text.trim();

		if (!author || !text)
			return;

		this.props.commentSubmit({author: author, text: text, postId: this.props.postid});
		this.setState({author:'', text:''});
	},
	render: function () {
		return (
			<form className="comment-add-form" onSubmit={this.handleSubmit}>
				<div>
					<label className="comment-label">Comment</label>
					<textarea className="comment-add-box" 
						   value = {this.state.text}
						   onChange = {this.handleContentChange}
						   placeholder= "Add Comment Here"
						   cols="45"
						   rows="8" >
					</textarea>
				</div>
				<label className="comment-label">Name</label>
				<input type="text" 
					   value={this.state.author} 
					   onChange={this.handleAuthorChange} />
				<input className="comment-label comment-submit" type="submit" value="Submit Comment" />
			</form>
		);
	}
});

module.exports = {CommentAddForm, CommentList};