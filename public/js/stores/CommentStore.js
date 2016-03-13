
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CommentConstants = require('../constants/CommentConstants');
var assign = require('object-assign');

var _comments = {};
var CHANGE_EVENT = 'change';

var CommentStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _comments;
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
  var text, postId, author;

  switch(action.actionType) {
    case TodoConstants.COMMENT_CREATE: 
      text   = action.text.trim();
      postId = action.postId.trim();
      author = action.author.trim();

      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = CommentStore;