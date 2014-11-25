// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
 // connect to our database
// define the schema for our user model
var waitlistSchema = mongoose.Schema({
  status: {type: String},
  capacity: {type: String},
  availableSeats: {type: String},
  prop: {type: String},
  courseNum: {type: String},
  crn: {type: String, unique: true},
  note: {type: String},
  description: {type: String},
  times: {type: String},
  days: {type: String},
  location: {type: String},
  instructor: {type: String},
  i_user: {type: String},
  unknown1: {type: String},
  unknown2: {type: String},
  unknown3: {type: String},
  unknown4: {type: String},
  unknown5: {type: String},
  unknown6: {type: String},
  locked: {type: Boolean, default: false},
  listing:  {type: mongoose.Schema.Types.Mixed},
  subscribers: {type: Array, default: Array}, //, unique: true?
  lastModified: { type: Date, default: Date.now },
  notified: { type: Date, default: Date.now }
});


module.exports = mongoose.model('waitlist', waitlistSchema);
