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
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/client')));

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

var course = function (info){
  return {
    status: info[0],
    capacity: info[1],
    avaliableSeats: info[2],
    prop: info[3],
    courseNum: info[4],
    crn: info[5],
    note: info[6],
    description: info[7],
    days: info[8],
    location: info[9],
    instructor: info[10],
    i_user: info[11],
    unknown1: info[12],
    unknown2: info[13],
    unknown3: info[14],
    unknown4: info[15],
    unknown5: info[16],
    unknown6: info[17],
    unknown7: info[18]
  };
};

app.get('/data', function(req, res) {
        var courses = [];
        var klass;
        _.each(data.main, function(info){
          klass = course(info);
          if (klass.status === "shut"){
            klass.description = klass.description.substr(0,20);
            klass.courseNum = "CS"+klass.courseNum;
            courses.push(klass);
          }
        });
        res.status(200).send(courses);
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

console.log("Head to http://localhost:" + (process.env.PORT || 3000));
app.listen(process.env.PORT || 3000);
app.set('port', process.env.PORT || 3000);
