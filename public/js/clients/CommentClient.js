var $ = require('jquery');

const commentsURL = '/api/comments';

var CommentClient = {
	load: function (postId, success, failure) {
    $.ajax({
          url: commentsURL + '/' + postId,
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
	submitComment: function (postObj, success, failure) {
		$.ajax({
          url: commentsURL,
          dataType: 'json',
          type: 'POST',
          data: postObj,
          success: function (data) {
          	success({
	          	text: data.text,
	            postId: data.postId,
	            author: data.author
          	});
          },
          error: function (xhr, status, err) {
            failure(status, err.toString());
          }
        });
	}
}

module.exports = CommentClient;


