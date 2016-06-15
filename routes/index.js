module.exports = function(io){

  var express = require('express');
  var bodyParser = require('body-parser');
  var router = express.Router();
  // could use one line instead: var router = require('express').Router();
  var tweetBank = require('../tweetBank');

  router.use(express.static('public'));

  router.use(bodyParser.urlencoded({ extended: false}))

  router.use(bodyParser.json())
  // router.get('/stylesheets/style.css', function(req, res){
  //   res.sendFile('../stylesheets/style.css');
  // });

  router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm:true } );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var tweets = tweetBank.find( {name: name} );
    res.render( 'index', { title: 'Twitter.js - Posts by '+name, user: name, tweets: tweets, showForm: true } );
  });

  router.get('/tweets/:id', function(req, res){
    var tweetID = Number(req.params.id);
    var tweets = tweetBank.find({id: tweetID});
    res.render( 'index', { title: 'Twitter.js - Posts by '+tweetID, tweets: tweets, showForm: false } );
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    var tweet = tweetBank.find({name:name, text:text});
    var id = tweet[0].id;
    io.sockets.emit('new_tweet', { name:name, text:text, id:id });
    res.redirect('/');
  });

  return router;
}
