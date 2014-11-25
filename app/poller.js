var data = require('../data/fall_2014');
var classData = require('../data/classes');
var Waitlist = require('./models/waitlist');
var _ = require('lodash');
var notify = require('./notify.js');

var courses = [];
var klass;


var course = function (info){
  return {
    status: info[0],
    capacity: info[1],
    availableSeats: info[2],
    prop: info[3],
    courseNum: info[4].toUpperCase(),
    crn: info[5],
    note: info[6],
    description: info[7],
    times: info[8],
    days: info[9],
    location: info[10],
    instructor: info[11],
    i_user: info[12],
    unknown1: info[13],
    unknown2: info[14],
    unknown3: info[15],
    unknown4: info[16],
    unknown5: info[17],
    unknown6: info[18]
  };
};

_.each(data.main, function(info){
    var klass = new course(info);
    klass.courseNum = "CS" + klass.courseNum;
    _.find(classData, function  (listing) {
      if (listing.code === klass.courseNum) {
        klass.listing = listing;
        //create a listing
        waitList = new Waitlist(klass);
        waitList.save(function (err) {
          if (!err) {
            //return console.log("created");
            console.log("created new record for ", klass.crn);
          } else {
               if (err.code === 11000 || err.code === 11001) {
                 //console.log("exists");
                 //do check updates
                Waitlist.findOne({"crn": klass.crn}, function (err, course) {
                  //update if change in status
                  if (course.status !== klass.status){
                    Waitlist.update({"crn": klass.crn},{"status":klass.status, "capacity:": klass.capacity, "availableSeats": klass.availableSeats}).exec();
                     console.log(klass.crn, course.crn, course.status, klass.status);
                     console.log(" a wild change has appeared");
                     //pass the array of subscribers
                     console.log(course.subscribers);
                     notify(course.subscribers);
                  }
                });
              }
            return err;
          }
        });
      }
    });
});
