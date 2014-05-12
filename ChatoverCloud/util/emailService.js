/**
 * Email Service for offline messages received by the client.
 */

var nodemailer = require("nodemailer");

function emailTo(json,callback){

var transport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: "sjsu.cmpe272@gmail.com",
        pass: "chittiSaar"
    }
});

// setup e-mail data with unicode symbols

var mailOptions = {
    from: "Saideepak <sjsu@gmail.com>", // sender address does not matter much. Its just a label.
    to: json.email, // list of receivers
    subject: json.subject, // Subject line
    text: json.text, // plaintext body
    html: json.message // html body  -> This is what appears in the body of the received email.
}

var sent = 0;
// send mail with defined transport object
transport.sendMail(mailOptions, function(error, response){
    if(error){
    	sent = 0;
        console.log(error);
    }else{
    	sent = 1;
        //console.log("Message sent: " + response.message);
    }

  
    transport.close(); // shut down the connection pool, no more messages
});

if(sent==1){
	callback(0,1);
}
else{
	callback(0,0);
}
}

exports.emailTo = emailTo;
