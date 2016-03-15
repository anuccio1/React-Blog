
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BlogPostConstants = require('../constants/BlogPostConstants');
var assign = require('object-assign');

var _blogposts = [];
var CHANGE_EVENT = 'change';

var _load = function (posts) {
  _blogposts = posts;
}

var BlogPostStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _blogposts;
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
  switch(action.actionType) {
    case BlogPostConstants.POST_LOAD_SUCCESS: 
      _load(action.posts);
      BlogPostStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = BlogPostStore;