var React    = require('react');
var ReactDOM = require('react-dom');

var allPosts = [
	{postId: 1, title: 'sample1', body: 'This is a sample blog post1', date: '5/3'  },
	{postId: 2, title: 'sample2', body: 'This is a sample blog post2', date: '5/4'	},
	{postId: 3, title: 'sample3', body: 'This is a sample blog post3', date: '5/5'	}
];

var allComments = [
	{postId: 1, author:'Alex Nuccio', content: 'This post suuuucks',   date: '5/5'},
	{postId: 2, author:'Alex Nuccio', content: 'This post is awesome', date: '5/5'},
	{postId: 4, author:'Alex Nuccio', content: 'This post isnt here',  date: '5/5'}	//this won't show up
];

/* COMMENT COMPONENTS */

var CommentList = React.createClass({
	render: function () {
		var commentList = this.props.comments.map(function (comment) {
			return (
				<div className="comment-list"> 
					<div className="comment-author">
						Comment By: {comment.author} on {comment.date}
					</div>
					<div className="comment-body">
						{comment.content}
					</div>
				</div>
			);
		})
		return ( 
			<div>{commentList}</div>
		);
	}
});

var CommentAddForm = React.createClass({
	getInitialState: function () {
		return {author:'', content: ''}
	},
	handleContentChange: function (e) {
		this.setState({content: e.target.value});
	},
	handleAuthorChange: function (e) {
		this.setState({author: e.target.value});
	},
	handleSubmit: function (e) {
		e.preventDefault();

		var author = this.state.author.trim();
		var content = this.state.content.trim();

		if (!author || !content)
			return;

		this.props.commentSubmit({author: author, content: content});
		this.setState({author:'', content:''});
	},
	render: function () {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Comment</label>
				<input className="comment-add-box" 
					   value={this.state.content}
					   onChange = {this.handleContentChange} />
				<label>Name</label>
				<input type="text" 
					   value={this.state.author} 
					   onChange={this.handleAuthorChange} />
				<input type="submit" value="Submit Comment" />
			</form>
		);
	}
});

var CommentForm = React.createClass({
	getInitialState: function () {
		return {comments: this.props.comments};
	},
	handleCommentSubmit: function (comment) {
		comment.date = '5/6';
		comment.postId = this.props.postid;
		this.props.comments.push(comment);

		this.setState({comments: this.props.comments});
	},
	render: function () {
		var commentsForThisPost = this.props.comments.filter( (comment) => {
			return (comment.postId === this.props.postid);
		});
		return (
			<div className="comment-form">
				<CommentList comments={commentsForThisPost} />
				<CommentAddForm commentSubmit={this.handleCommentSubmit}/>
			</div>
		);
	}
});

/*BLOG COMPONENTS*/

var BlogTitle = React.createClass({
	render: function() {
		return  (
			<h1 className="blog-header">Alex's Siiiick Blog</h1>
		);
	}
});

var BlogPost = React.createClass({
	render: function () {
		return (
			<div className="blog-post">
				<div className="blog-post-title">{this.props.title}</div>
				<div className="blog-post-time">{this.props.date}</div>
				<div className="blog-post-body">{this.props.body}</div>
				<CommentForm comments={allComments} postid={this.props.postid} />
			</div>
		);
	}
});

var BlogPostList = React.createClass({
	render: function () {
		var blogPosts = this.props.posts.map(function (post) {
			return (<BlogPost 
						postid =  {post.postId}
						title  =  {post.title} 
						date   =  {post.date} 
						body   =  {post.body} >
					</BlogPost>
			);
		});
		return (
			<div>{blogPosts}</div>
		);
	}
});

//parent component
var BlogPage = React.createClass({
	render: function () {
		return (
			<div className="blog-parent">
				<BlogTitle />
			    <BlogPostList posts={this.props.posts} />
			</div>
		);
	}
});


ReactDOM.render(
  <BlogPage posts={allPosts} />,
  document.getElementById('blog')
);