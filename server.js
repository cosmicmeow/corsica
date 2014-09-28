var Path = require('path');
var Hapi = require('hapi');
var data = require('./data/fall_2014');
var _ = require('lodash');

var server = new Hapi.Server('localhost', 3000, { files: { relativeTo: Path.join(__dirname, './') } });

var course = function (info){
  return {
    //hash: md5(hash),
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

server.route({
    method: 'POST',
    path: '/subscribe',
    handler: function (request, reply) {
      //twilio you are subscribed to --- blah
    }
});

// Start your Mullet Server
server.start(function () {
  console.log('Coursica is running on port: 3000');
});
