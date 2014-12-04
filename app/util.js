var nodemailer = require('nodemailer');
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var _ = require('lodash');

// Nodejs encryption with CTR
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'CORSICA'; //This should be secret


var util = exports;

util.encrypt = function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};



util.decrypt = function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password);
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};

util.notify = function notify(waitlist){
console.log("Calling notify function");
console.log(waitlist);
// setup e-mail data with unicode symbols
_.each(waitlist.subscribers, function (person, key) {
  console.log(person.firstName, "your position is " + (key+1) + " on the waitlist");

  var text = 'A spot has opened up in ' + waitlist.listing.code + ": " + waitlist.listing.title ; // plaintext body
  var subject = 'A spot has opened up in ' + waitlist.listing.code;
  var html = 'A spot has opened up in ' + waitlist.listing.code + ": " + waitlist.listing.title + 'Your position is ' + (key+1);
  console.log(person.textPreference===true);
  if (key === 0){
    var link = "http://red411.herokuapp.com/confirm/"+ waitlist._id + "?u="+ util.encrypt(person.email);
    console.log("link");
    html = html + " To claim, head to '"+ link;
    if (person.textPreference === true || person.textPreference === "true" ){
      console.log("sent a text");
      util.message(person.phoneNumber, waitlist.listing.code);
    }
  }

  //perform actions
   util.mail(person.email, subject, text, html);
  });
};

/** CLAIM A WAITLIST SPOT **/
util.claim = function notify(waitlist){

  // setup e-mail data with unicode symbols
  //  _.each(waitlist.subscribers, function (person, key) {
    var person = waitlist.subscribers[0];
    var text = person.firstName + " " + person.lastName + " has accepted the spot for course: " + waitlist.courseNum + " crn: " + waitlist.crn; // plaintext body
    var subject = "CORSICA WAITLIST REQUEST";
    var html = text;
    var admin = "oratt001@gmail.com";

    //perform actions
    util.mail(admin, subject, text, html );
//  });
};

util.mail = function mail(to,subject,text,html) {
  // create reusable transporter object using SMTP transport

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'corsica.odu@gmail.com',
      pass: 'brunelle'
    }
  });

  // body...
  var mailOptions = {
      from: 'Corsica (oratt001@gmail.com)', // sender address
      to: to, // list of receivers
      subject: subject,
      text: text,
      html: html// html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          return error;
      }else{
          console.log('Message sent: ' + info.response);
          return info.reponse;
      }
  });
};
/* Text the User
*  @param wailist
*  @param people on the list
*/
util.message = function message(number, course) {
  // body...
twilio.sendMessage({
  to: number, // Any number Twilio can deliver to
  from: '+17579135000', // A number you bought from Twilio and can use for outbound communication
  body: "Hi, This is CORSICA, a spot in " + course + " has opened up",
  }, function( err, responseData) {
  console.log(err);
  if (!err) {
    console.log(responseData);
    return responseData;
    //res.end();
    }
  });
};

//module.exports(list);
