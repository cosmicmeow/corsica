var data = require('../data/fall_2014');
var classData = require('../data/classes');
var Waitlist = require('./models/waitlist');
var _ = require('lodash');

var courses = [];
var klass;


var course = function (info){
  return {
    status: info[0],
    capacity: info[1],
    avaliableSeats: info[2],
    prop: info[3],
    courseNum: info[4].toUpperCase(),
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

_.each(data.main, function(info){
  klass = course(info);
    //check if it exists already
    klass.courseNum = "CS" + klass.courseNum;
    _.find(classData, function  (listing) {
      if(listing.code === klass.courseNum){
        klass.listing = listing;
        //create a listing
        waitList = new Waitlist({
          info : klass,
          crn  : klass.crn
        });
        waitList.save(function (err) {
          if (!err) {
            return console.log("created");
          } else {
            return console.log(err);
          }
        });
      }
    });
});
