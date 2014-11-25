var nodemailer = require('nodemailer');

module.exports = function notify (waitlist){
// create reusable transporter object using SMTP transport
var emails = waitlist.subscribers.reduce(function(a,b){
    return a +", "+ b;
  });
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'xtupledev@gmail.com',
        pass: 'xTuple!23510'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Corsica (oratt001@gmail.com)', // sender address
    to: emails, // list of receivers
    subject: 'A spot has opened up in ' + waitlist.listing.code, // Subject line
    text: 'A spot has opened up in ' + waitlist.listing.code + ": " + waitlist.listing.description + 'click here to join', // plaintext body
    html: '<b>A spot has opened up in ' + waitlist.listing.code + ": " + waitlist.listing.description + 'click here to join</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});

};
