var $ = require('jquery');

const blogPostURL = '/api/posts';

var BlogPostClient = {
	load: function (success, failure) {
		$.ajax({
          url: blogPostURL,
          dataType: 'json',
          type: 'GET',
          success: function (data) {
          	success(data);
          },
          error: function (xhr, status, err) {
            failure(status, err.toString());
          }
        });
	},
	submitPost: function (postObj, success, failure) {
		$.ajax({
          url: blogPostURL,
          dataType: 'json',
          type: 'POST',
          data: postObj,
          success: function (data) {
          	success({
	          	text: data.text,
	            postId: data.postId,
	            title: data.title
          	});
          },
          error: function (xhr, status, err) {
            failure(status, err.toString());
          }
        });
	}
}

module.exports = BlogPostClient;


