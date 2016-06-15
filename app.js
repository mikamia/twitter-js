var express = require('express');
var swig = require('swig');
var app = express();
var routes = require('./routes/');
var socketio = require('socket.io');
var server = app.listen(3000);
var io = socketio.listen(server);
app.use('/', routes(io));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views/');
swig.setDefaults({ cache: false });

// app.use(function (req, res, next) {
//     console.log('application level status code', res.statusCode);
//     next();
// });


// app.get('/', function(req, res){
//   var people = [{name: 'Ayako'}, {name: 'Winnie'}, {name: 'Chocolate'}];
//   res.render( 'index', {title: 'Hall of Fame', people: people} );
//   //res.render('index.html', locals);
//   // swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
//   //   res.send(output);
//   // });
//   console.log('GET');

// });




console.log("server listening....");

// var locals = {
//     title: 'An Example',
//     people: [
//         { name: 'Gandalf'},
//         { name: 'Frodo' },
//         { name: 'Hermione'}
//     ]
// };


