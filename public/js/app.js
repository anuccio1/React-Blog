var ReactDOM = require('react-dom');
var BlogApp = require('./components/BlogApp.react');

ReactDOM.render(
  <BlogApp commentsurl="/api/comments" postsurl="/api/posts" />,
  document.getElementById('blog')
);