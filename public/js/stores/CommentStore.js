
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('../constants/CommentConstants');
var assign = require('object-assign');

var _comments = {};
var CHANGE_EVENT = 'change';

var _load = function (comments, postid) {
  _comments[postid] = comments;
};

var CommentStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function(postid) {
    var commentsToReturn = _comments[postid] || [];
    return commentsToReturn;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text, postId, author, comments;

  switch(action.actionType) {
    case CommentConstants.COMMENT_CREATE: {
      text   = action.text.trim();
      postId = action.postId.trim();
      author = action.author.trim();

      if (text !== '') {
        create(text);
        CommentStore.emitChange();
      }
      break;
    }
    case CommentConstants.COMMENT_LOAD_SUCCESS: {
      comments = action.comments;
      postId = action.postId;

      _load(comments, postId);
      CommentStore.emitChange();

      break;
    }
    case CommentConstants.COMMENT_POST_SUCCESS: {
      console.log('post success');
      break;
    }
    default:
      // no op
  }
});

module.exports = CommentStore;