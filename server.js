var Path = require('path');
var Hapi = require('hapi');
var data = require('./data/fall_2014');
var _ = require('lodash');
var port = (process.env.PORT || 5000);
var dotenv = require('dotenv');
dotenv.load();
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var server = new Hapi.Server(port, { files: { relativeTo: Path.join(__dirname, './') } });

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


// Serve static files from `static` dir.
server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
      directory: { path: './', listing: false, index: true }
  }
});

server.route({
    method: 'GET',
    path: '/data',
    handler: function (request, reply) {
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
        reply(courses);
    }
});
/*
server.route({
    method: 'POST',
    path: '/subscribe',
    handler: function (request, reply) {
      //twilio you are subscribed to --- blah
       var number = request.payload.number;
       var name = request.payload.name;
       var message = request.payload.message;
       message = "you are now subscribed to Corsica";
      //reply(request.payload);
      twilio.sendMessage({

          to: number, // Any number Twilio can deliver to
          from: '+13476479140',
          body: 'Hello ' + name + ": " + message,
      }, function(err, responseData) {
          console.log(err);
          if (!err) {
          console.log(responseData);
          reply(responseData.from + " " + responseData.body);
          }
      });
    }
});
*/

// Start your Server
server.start(function () {
  console.log('Corsica is running on port:', port);
});
