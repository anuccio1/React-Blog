var React = window.React          = require('react');
var BlogTitle 		= require('./Header.react');
var BlogPostList 	= require('./BlogPosts.react');
var BlogPostStore 	= require('../stores/BlogPostStore');
var BlogPostActions = require('../actions/BlogPostActions');

function getBlogPostState() {
  return {
    allPosts: BlogPostStore.getAll()
  };
}

var BlogApp = React.createClass({
	getInitialState: function () {
		return getBlogPostState();
	},
	componentWillMount: function () {
		BlogPostActions.load();	//load posts from server
	},
	componentDidMount: function () {
		BlogPostStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		BlogPostStore.removeChangeListener(this._onChange);
	},
	render: function () {
		return (
			<div className="blog-parent">
				<BlogTitle />
			    <BlogPostList allposts={this.state.allPosts} />
			</div>
		);
	},
	_onChange: function () {
		this.setState(getBlogPostState());
	}
});



module.exports = BlogApp;