var AppDispatcher = require('../dispatcher/AppDispatcher');
var CommentConstants = require('../constants/CommentConstants');
var CommentClient = require('../clients/CommentClient');

var CommentActions = {

  load: function(postId) {
    //AppDispatcher.dispatch({ actionType: CommentConstants.COMMENT_LOAD });

    CommentClient.load(postId,
      function (comments) {
        //successful loading of posts. dispatch message
        AppDispatcher.dispatch({
          actionType: CommentConstants.COMMENT_LOAD_SUCCESS,
          comments: comments,
          postId: postId
        });
      },
      function (status, err) {
        //failure. dispatch failure message
        AppDispatcher.dispatch({
          actionType: CommentConstants.COMMENT_LOAD_FAILURE,
          status: status,
          err: err
        });
      });
  },
  /**
   * @param  {string} comment: this is an object 
   */
  create: function(author, text, postId) {
    AppDispatcher.dispatch({ actionType: CommentConstants.COMMENT_POST });
    var postObj = {author, text, postId};

    CommentClient.submitComment(postObj,
      function (data) {
        //successful loading of posts. dispatch message
        AppDispatcher.dispatch({
          actionType: CommentConstants.COMMENT_POST_SUCCESS,
          text: data.text,
          author: data.author,
          postId: data.postId
        });
      },
      function (status, err) {
        //failure. dispatch failure message
        AppDispatcher.dispatch({
          actionType: BlogPostConstants.COMMENT_POST_FAILURE,
          status: status,
          err: err
        });
      });
  }

};

module.exports = CommentActions;