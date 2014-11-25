var nodemailer = require('nodemailer');

module.exports.notify = function notify (emails){
// create reusable transporter object using SMTP transport
emails = emails.reduce(function(a,b){
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
    from: 'Corsica', // sender address
    to: emails, // list of receivers
    subject: 'A spot has opened up', // Subject line
    text: 'A spot has opened up in the class you were interested in, click here', // plaintext body
    html: '<b>A spot has opened up in the class you were interested in, click here</b>' // html body
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
