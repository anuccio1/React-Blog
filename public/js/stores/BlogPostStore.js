
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var BlogPostConstants = require('../constants/BlogPostConstants');
var assign = require('object-assign');

var _blogposts = {};
var CHANGE_EVENT = 'change';

var create = function (text, title) {
  var postId = (+new Date() + Math.floor(Math.random() * 999999)).toString(36); 
  _blogposts[postId] = {text: text, title: title};
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
  var text, title;

  switch(action.actionType) {
    case BlogPostConstants.BLOGPOST_CREATE: 
      text   = action.text.trim();
      title = action.title.trim();

      if (text !== '' && title !== '') {
        create(text, title);
        BlogPostStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = BlogPostStore;