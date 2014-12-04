var data = require('../data/fall_2014');
var classData = require('../data/classes');
var Waitlist = require('./models/waitlist');
var _ = require('lodash');
var util = require('./util.js');
var moment = require('moment');

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

console.log("poller is running, looking for changes");
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
                Waitlist.findOne({"crn": klass.crn}, function (err, waitlist) {
                  //update if change in status
                  // if (waitlist.crn==="13417"){
                  //    console.log(klass.availableSeats);
                  //    console.log(waitlist.availableSeats);
                  //   console.log(waitlist.availableSeats !== klass.availableSeats);
                  // }

                  //notify people in the system of changes
                  if (waitlist.availableSeats !== klass.availableSeats){
                      console.log("-------------------------------------");
                      console.log("Change detected in", waitlist.crn);

                      console.log("Before:", waitlist.availableSeats, waitlist.status);
                      console.log("After:", klass.availableSeats, klass.status);

                      console.log("------------------------------------");
                      //over a day since last notified?
                      var now = moment();
                      var past = moment(waitlist.notified);

                      /** DEBUGGING EVERY HOUR **/
                      /** NOTE CHANGE HIS FOR PRODUCTION TO SET INTERVAL FOR UPDATE **/
                      var elapsed = now.diff(past, "hours");
                      console.log("elasped:", elapsed);
                      console.log("waitlist.notified:", waitlist.notified);
                      console.log("moment.utc:", moment.utc());

                      console.log("-------------------------------------");


                      if (waitlist.status !== klass.status && elapsed > 0){

                          //remove the first person from the list when...
                      Waitlist.update({"crn": klass.crn},{"status":klass.status, "capacity:": klass.capacity, "availableSeats": klass.availableSeats, "notified": moment()}).exec();
                       console.log(klass.crn, waitlist.crn, waitlist.status, klass.status);
                       console.log("See change(s), send out notification.");
                       //pass the array of subscribers
                       console.log(waitlist.subscribers);
                       util.notify(waitlist);
                      }
                      else {
                        //updates only the change in status
                        Waitlist.update({"crn": klass.crn},{"status":klass.status, "capacity:": klass.capacity, "availableSeats": klass.availableSeats}).exec();
                         console.log(klass.crn, waitlist.crn, waitlist.status, klass.status);
                         console.log("See change(s), but dont send out notification.");
                         //pass the array of subscribers
                         console.log(waitlist.subscribers);
                      }

                    console.log("-------------------------------------");
                  }
                });
              }
            return err;
          }
        });
      }
    });
});
