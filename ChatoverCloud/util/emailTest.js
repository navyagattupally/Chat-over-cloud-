var email = require('./emailService.js');

var json = [];
json.email = "a.divyanshu@gmail.com";
json.subject = "Test Message";
json.text = "Hey! Its Working!";

email.emailTo(json,function(err,res){
	if(!err){
		console.log("sent.");
	}
	else{
		console.log("Error");
	}
});