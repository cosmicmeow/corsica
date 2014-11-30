var nodemailer = require('nodemailer');
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var _ = require('lodash');
var list = require ('./fakedata.json');



module.exports =
function notify (waitlist){
// create reusable transporter object using SMTP transport

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'xtupledev@gmail.com',
        pass: 'xTuple!23510'
    }
});


// setup e-mail data with unicode symbols
_.each(waitlist.subscribers, function (person, key) {
  console.log(person.firstName, "your position is " + (key+1) + " on the waitlist");

  var text = 'A spot has opened up in ' + waitlist.listing.code + ": " + waitlist.listing.title ; // plaintext body
  var subject = 'A spot has opened up in ' + waitlist.listing.code;
  var html = '<b>A spot has opened up in ' + waitlist.listing.code + ": " + waitlist.listing.title + 'Your position is ' + (key+1) + '</b>';
  console.log(person.textPreference===true);
  if (key === 0){
    text = text + " To claim, head to http://localhost:3000/email/" + waitlist._id;
    html = html + " To claim, head to <a href='http://localhost:3000/email/'>Claim</a>" + waitlist._id;
    if (person.textPreference===true || person.textPreference==="true" ){
      console.log("sent a text");
      message(person.phoneNumber, waitlist.listing.code);
    }
  }

  //perform actions
  mail(person.email, text, html );
});

  function mail(to,subject,text,html) {
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
  }
  /* Text the User
  *  @param wailist
  *  @param people on the list
  */
  function message(number, course) {
    // body...
  twilio.sendMessage({
    to: number, // Any number Twilio can deliver to
    from: '+17579135000', // A number you bought from Twilio and can use for outbound communication
    body: "Hi, This is CORSICA, a spot in " + course + "has opened up",
    }, function( err, responseData) {
    console.log(err);
    if (!err) {
      console.log(responseData);
      return responseData;
      //res.end();
      }
    });
  }
};

module.exports(list);
