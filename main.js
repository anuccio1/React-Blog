var React    = require('react');
var ReactDOM = require('react-dom');

var allPosts = [
	{postId: 1, title: 'Blog Post 1', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae id voluptatem placeat nisi itaque fugiat eaque, suscipit numquam est corrupti optio quo adipisci ratione facilis. Pariatur minima accusantium, ab natus.', date: '5/3'  },
	{postId: 2, title: 'Blog Post 2', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae id voluptatem placeat nisi itaque fugiat eaque, suscipit numquam est corrupti optio quo adipisci ratione facilis. Pariatur minima accusantium, ab natus.', date: '5/4'	},
	{postId: 3, title: 'Blog Post 3', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae id voluptatem placeat nisi itaque fugiat eaque, suscipit numquam est corrupti optio quo adipisci ratione facilis. Pariatur minima accusantium, ab natus.', date: '5/5'	}
];

var allComments = [
	{postId: 1, author:'Alex Nuccio', content: 'This post suuuucks',   date: '5/5'},
	{postId: 2, author:'Alex Nuccio', content: 'This post is awesome', date: '5/5'},
	{postId: 4, author:'Alex Nuccio', content: 'This post isnt here',  date: '5/5'}	//this won't show up
];

/* COMMENT COMPONENTS */

var Comment = React.createClass({
	render: function () {
		return (
			<div className="comment"> 
				<div className="comment-author">
					<i className="fa fa-user fa-3x"></i>
					{this.props.author} on {this.props.date}
				</div>
				<div className="comment-body">
					{this.props.content}
				</div>
			</div>
		);
	}
})

var CommentList = React.createClass({
	render: function () {
		var commentList = this.props.comments.map(function (comment) {
			return (
				<Comment author={comment.author} content= {comment.content} date={comment.date} />
			);
		})
		return ( 
			<div className="comment-list">
				{commentList}
			</div>
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
			<form className="comment-add-form" onSubmit={this.handleSubmit}>
				<div>
					<label className="comment-label">Comment</label>
					<textarea className="comment-add-box" 
						   value = {this.state.content}
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

var CommentForm = React.createClass({
	getInitialState: function () {
		return {comments: this.props.comments};
	},
	handleCommentSubmit: function (comment) {
		comment.date = '5/6';
		comment.postId = this.props.postid;
		this.props.comments.push(comment);

		//add comment to state
		this.setState({comments: this.props.comments});
	},
	render: function () {
		var commentsForThisPost = this.props.comments.filter( (comment) => {
			return (comment.postId === this.props.postid);
		});
		return (
			<div className="comment-form">
				<h2 id="commentHeader">Comments</h2>
				<CommentList comments={commentsForThisPost} />
				<CommentAddForm commentSubmit={this.handleCommentSubmit} />
			</div>
		);
	}
});

/*BLOG COMPONENTS*/

var BlogTitle = React.createClass({
	render: function() {
		return  (
			<h1 className="blog-header">Alex's Very Trill, Very Sick Blog</h1>
		);
	}
});

var BlogPost = React.createClass({
	render: function () {
		return (
			<div className="blog-post">
				<h1 className="blog-post-title">{this.props.title}</h1>
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