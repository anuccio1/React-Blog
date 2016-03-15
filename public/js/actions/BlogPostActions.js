var AppDispatcher = require('../dispatcher/AppDispatcher');
var BlogPostConstants = require('../constants/BlogPostConstants');
var BlogPostClient = require('../clients/BlogPostClient');

var BlogPostActions = {

  load: function() {
    AppDispatcher.dispatch({ actionType: BlogPostConstants.POST_LOAD });

    BlogPostClient.load(
      function (data) {
        //successful loading of posts. dispatch message
        AppDispatcher.dispatch({
          actionType: BlogPostConstants.POST_LOAD_SUCCESS,
          posts: data
        });
      },
      function (status, err) {
        //failure. dispatch failure message
        AppDispatcher.dispatch({
          actionType: BlogPostConstants.POST_LOAD_FAILURE,
          status: status,
          err: err
        });
      });
  }

};

module.exports = BlogPostActions;