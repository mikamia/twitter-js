var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.use(express.static('public'));

// router.get('/stylesheets/style.css', function(req, res){
//   res.sendFile('../stylesheets/style.css');
// });

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: tweets } );
});

router.get('/tweets/:id', function(req, res){
  var userID = Number(req.params.id);
  var tweets = tweetBank.find({id: userID});
  res.render( 'index', { title: 'Twitter.js - Posts by '+userID, tweets: tweets } );
});

module.exports = router;
