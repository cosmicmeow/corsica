// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var waitlistSchema = mongoose.Schema({
  subscribers: {type: Array, default: false}, //, unique: true?
  modified: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});


module.exports = mongoose.model('waitlist', waitlistSchema);
