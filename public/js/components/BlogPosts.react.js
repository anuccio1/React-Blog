/*BLOG COMPONENTS*/

var React = require('react');
var CommentForm = require('./Comments.react');

const BlogPost = React.createClass({
	render: function () {
		return (
			<div className="blog-post">
				<h1 className="blog-post-title">{this.props.title}</h1>
				<div className="blog-post-body">{this.props.text}</div>
				<CommentForm postid={this.props.postid} />
			</div>
		);
	}
});

const BlogPostList = React.createClass({
	render: function () {
		var blogPosts = this.props.allposts.map( (post) => {
			return (
				<BlogPost
					key    =  {post.postId}
					postid =  {post.postId}
					title  =  {post.title} 
					text   =  {post.text}
				>
				</BlogPost>
			);
		});
		return (
			<div>{blogPosts}</div>
		);
	}
});

module.exports = BlogPostList;