var express = require("express");
var router = express.Router();
var fs = require('fs');
var path = require('path');

var COMMENTS_FILE = path.join(__dirname, 'comments.json');
var BLOGPOSTS_FILE = path.join(__dirname, 'blogposts.json');

//get all comments
router.get('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

//get individual comment
router.get('/comments/:post_id', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var allComments = JSON.parse(data);
    allComments = allComments.filter( function (comment) {
      return comment.postId.toString() === req.params.post_id
    });
    res.json(allComments);
  });
});

router.post('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      postId: Number(req.body.postId),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);

    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      commentsToReturn = comments.filter( function (comment) {
        return comment.postId.toString() === req.body.postId.toString()
      });

      res.json(commentsToReturn);
    });
  });
});

router.get('/posts', function(req, res) {
  fs.readFile(BLOGPOSTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

router.post('/posts', function(req, res) {
  fs.readFile(BLOGPOSTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var posts = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newPost = {
      postId: posts.length + 1,
      title:  req.body.title,
      text:   req.body.text,
    };
    posts.push(newPost);
    fs.writeFile(BLOGPOSTS_FILE, JSON.stringify(posts, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(posts);
    });
  });
});

module.exports = router;