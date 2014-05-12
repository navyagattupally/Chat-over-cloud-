
var client = require('../util/clientDB');
   var knowledge = require('../util/knowledgeDB');
   var offline=require('../util/conversationDB');
   var conversation=require('../util/offlineDB');
   
   
   
   
    exports.adminvalidate = function (req, res) {
	if(!req.body.hasOwnProperty('name') ||!req.body.hasOwnProperty('password')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}
	var json = [];
	json.clientId= req.body.name;
	json.password= req.body.password;
	client.validateClientLogin(function(err,results){
		if(err){
			throw err;
		}else{
			if(results==1){
				//setting flag to 'online
				console.log('set flag to online');
				var json = [];
				json.clientId= req.body.name;
				json.clientFlag= req.body.clientFlag;
				client.setClientFlag({"clientId": json.clientId});
				req.session.clientId = req.body.name;
				console.log(req.session.clientId);
			res.render('../views/admin.ejs');
			console.log("success");
			
			}
			else if(results==0)
			{
			console.log("Invalid Id or Password");
			}
		}
	},json);
	
    }
    
    exports.insertkb = function (req, res) {
    	if(!req.body.hasOwnProperty('clientId') ||!req.body.hasOwnProperty('questionCategory')||!req.body.hasOwnProperty('question')||!req.body.hasOwnProperty('answer')||!req.body.hasOwnProperty('keywords')) {
    		res.statusCode = 400;
    		return res.send('Error 400: Post syntax incorrect.');
    	}
    	else {
    	var json = [];
    	json.clientId= req.body.name;
    	json.questionCategory= req.body.category;
    	json.question=req.body.question;
    	json.answer=req.body.answer;    	
    	knowledge.insertKnowledgeDBMessage(json);    		
    	}
    	}
    
    exports.inbox = function (req, res) {
    	if(!req.body.hasOwnProperty('clientId')||!req.body.hasOwnProperty('unreadFlag')) {
    		res.statusCode = 400;
    		return res.send('Error 400: Post syntax incorrect.');
    	}
    	else {
    		
    	var json = [];
    	json.clientId= req.body.clientId;
    	json.unreadFlag=1;
    	admin.findUnreadMessagesByClient(function(err,results){
    		if(err){
    			throw err;
    		}else{
    			
    			console.log(results);
    			res.render('messages');
    		}
    	});
   }
 }
 exports.replyEmails = function (req, res) {
    	console.log("inside retrieve tickets");
    	if(!req.body.hasOwnProperty('clientEmail')||!req.body.hasOwnProperty('message')) {
    		res.statusCode = 400;
    		return res.send('Error 400: Post syntax incorrect.');
    	}
    	else {
    	var json = [];
    	json.email = req.body.hasOwnProperty('clientEmail');
    	json.subject = "Thank you for reaching us";
    	json.text = "your response";
    	email.emailTo(json,function(err,res){
    		if(!err){
    			console.log("email sent.");
    		}
    		else{
    			console.log("Error");
    		}
    	});
   }
 }
    
exports.adminChat=function(req,res)
{
	console.log("Inside admin chat");
	
	if(!req.body.hasOwnProperty('message')) {
		console.log("Does not have message");
		res.statusCode = 400;
		return res.send('1, Error 400: Post syntax incorrect.');
	}
	console.log("Message from admin : " + req.body.message);
	//res.set('Content-Type', 'text/plain');
	res.statusCode=200;
	
	res.send("0,*siddy will give you*");
	}

exports.chat=function(req,res)
{
	if(req.session.clientId!="" && req.session.clientId!=null)
		{
		console.log(req.session.clientId);
		res.render('chat');
		}
		
	else 
		{
		console.log(req.session.clientId);
		res.render('index');
		}
}


exports.clientPollReq = function(req, res){

	if(!req.body.hasOwnProperty('clientId') ||  !req.body.hasOwnProperty('conversationId')|| !req.body.hasOwnProperty('lastReq')) 
	{		
		console.log("all the fields are required");

		res.statusCode = 400;
		return res.send('1, Error 400: Post syntax incorrect.');
	}
	else {

		var json=[];
		json.conversationID=req.body.conversationId;
		json.t1=req.body.lastReq;
		json.clientId=req.body.clientid;

		console.log("clientId : " + req.body.clientId);
		console.log("conversationID : " + req.body.conversationId);
		console.log("timeStamp : " + req.body.lastReq);

		//sayHello();
		conversation.getConversationsGreaterThanT1(function(err,result){
			console.log("inside get conversation t1");
			if(err)
				console.log(err);
			else
			{
				res.statusCode=200;
				console.log("Poll Response :" + result);
				res.send("0^" + result);

			}
		},json);

	}
}
exports.knowledgeDB=function(req,res)
{
	res.render('tables');
	}
exports.dashboard=function(req,res)
{
	if(req.session.clientId!="" && req.session.clientId!=null)
		{
		
		res.render('admin');
		}
		
	else 
		{
		
		res.render('index');
		}
}
exports.logout=function(req,res)
{
req.session.clientId=null;
res.render('index');


}

