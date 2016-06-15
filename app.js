var express = require('express');
var swig = require('swig');
var app = express();

app.use(function (req, res, next) {
    console.log('application level status code', res.statusCode);
    next();
});

app.use('/special', function (req, res, next) {
    console.log('special application level');
    next();
})


app.get('/', function(req, res){
  res.send('hi');
  console.log('GET');

});


app.listen(3000);
console.log("server listening....");
