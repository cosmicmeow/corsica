// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var waitlistSchema = mongoose.Schema({
  info: {type: mongoose.Schema.Types.Mixed},
  crn: {type: String},
  subscribers: {type: Array, default: false}, //, unique: true?
  lastModified: { type: Date, default: Date.now },
  notified: { type: Date, default: Date.now }
});


module.exports = mongoose.model('waitlist', waitlistSchema);
