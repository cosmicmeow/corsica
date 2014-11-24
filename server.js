var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var data = require('./data/fall_2014');
var _ = require('lodash');
var port = (process.env.PORT || 5000);
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var configDB = require('./config/database.js');

require('./config/passport')(passport); // pass passport for configuration
dotenv.load();
//var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

/** PASSPORT USER LOGIN**/
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/api.js')(app, passport);

app.use("/", express.static(path.join(__dirname, '/public')));
app.use('/client', function(req, res, next) {
    if (req.user === undefined && req.path.indexOf('/client') === 0)
    {
        res.redirect('/login');
        return;
    }
    next();
});

app.use(function(req, res, next) {
    var err = new Error('Not Found | No such route');
    err.status = 404;
    next(err);
});

console.log("Head to http://localhost:" + (process.env.PORT || 3000));
app.listen(process.env.PORT || 3000);
app.set('port', process.env.PORT || 3000);
