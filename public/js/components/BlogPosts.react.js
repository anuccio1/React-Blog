/*BLOG COMPONENTS*/

var React = require('react');
var CommentForm = require('./Comments.react');

const BlogPost = React.createClass({
	render: function () {
		return (
			<div className="blog-post">
				<h1 className="blog-post-title">{this.props.title}</h1>
				<div className="blog-post-body">{this.props.text}</div>
				<CommentForm commentsurl={this.props.commentsurl} postid={this.props.postid} />
			</div>
		);
	}
});

const BlogPostList = React.createClass({
	getInitialState: function () {
		return { posts:[] };
	},
	loadPostsFromServer: function () {
		$.ajax({
	      url: this.props.postsurl,
	      dataType: 'json',
	      type: 'GET',
	      success: function (data) {
	        this.setState({posts:data});
	      }.bind(this),
	      error: function (xhr, status, err) {
	        console.error(this.props.postsurl, status, err.toString());
	      }.bind(this)
	    });
	},
	componentDidMount: function () {
		this.loadPostsFromServer();
	},
	render: function () {
		var blogPosts = this.state.posts.map( (post) => {
			return (
				<BlogPost
					key    =  {post.postId}
					postid =  {post.postId}
					title  =  {post.title} 
					date   =  {post.date} 
					text   =  {post.text}
					commentsurl= {this.props.commentsurl} >
				</BlogPost>
			);
		});
		return (
			<div>{blogPosts}</div>
		);
	}
});

module.exports = BlogPostList;