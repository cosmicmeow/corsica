var request = require('request');
var vm = require('vm');
var md5 = require('MD5');

/* database */
//var mongo = require('mongoskin');
//var db = mongo.db("mongodb://localhost:27017/corsica", {native_parser:true});


var url = 'http://www.cs.odu.edu/~ibl/JSON/fall14.js';
var test = ["tiny","cap:20; enroll:17;avail:3","3","p","121g","30401","","Introduction to Information Literacy and Research for Scientists","1530-1855","TR","ECSB 3104","GUPTA, A","ajay","0","X","","dupodd","A","N"];
var courses = [];

/* Factory Pattern */
var course = function (info){

  var hash = info.join();

  return {
    hash: md5(hash),
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
    unknown7: info[18],
  };
};

/* Run this every 15 minutes probably at peak times during day, hourly or not at night */

request.get(url, function(err,res){
  //console.log(res.body);
  if (err){
    throw err;
  }
  //like eval
  vm.runInThisContext(res.body);
  var body = JASON;
  console.log(body);
  _.each(body.main, function(data){
    courses.push(course(data));
    // db.collection('course').insert(course(data), function(err, result) {
    //     //console.log(result);
    // });
  });
  console.log(courses);
});
/* Scenario course has one seat open
   Script runs and finds difference
*/
