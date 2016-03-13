var React = require('react');
var BlogTitle = require('./Header.react');
var BlogPostList = require('./BlogPosts.react');

const BlogApp = React.createClass({
	render: function () {
		return (
			<div className="blog-parent">
				<BlogTitle />
			    <BlogPostList commentsurl={this.props.commentsurl} postsurl={this.props.postsurl} />
			</div>
		);
	}
});

module.exports = BlogApp;