//dependencies
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

//initialize Express app
var express = require('express');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(process.cwd() + '/public'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

if (process.env.NODE_ENV == 'production') {
    mongoose.connect('mongodb://vladkondrachuk:Omeg@100@ds125673.mlab.com:25673/heroku_859wzpc0');
} else {
    mongoose.connect('mongodb://localhost/mongoHeadlines');
}
var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function (err) {
    console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function () {
    console.log('Mongoose connection successful.');
});

var routes = require('./controller/controller.js');
app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Listening on PORT ' + port);
});