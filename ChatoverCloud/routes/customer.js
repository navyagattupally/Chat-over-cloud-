var categories = require("../util/CategoriesDB")
var client = require("../util/clientDB")
var conversation = require('../util/conversationDB');
var knowledge = require('../util/knowledgeDB');
var offline = require('../util/offlineDB');
/**
 * New node file
 */
exports.processrequest = function(req, res){
	//res.send("respond with a resource");
	console.log("Inside Customer Process Request");
	//console.log(req.body);
	if(!req.body.hasOwnProperty('message') || !req.body.hasOwnProperty('conversationId') || !req.body.hasOwnProperty('clientId')) {
		console.log("Does not have message");
		res.statusCode = 400;
		return res.send('1, Error 400: Post syntax incorrect.');
	}
	console.log("Message from Customer : " + req.body.message);
	//res.set('Content-Type', 'text/plain');
	res.statusCode=200;
	//res.setHeader("Cache-Control", "no-cache"); // HTTP 1.1
	//res.setHeader("Pragma", "no-cache"); // HTTP 1.0
	//res.setDateHeader("Expires", 0); // prevents caching at the proxy
	// server
	//res.setHeader("Cache-Control", "no-store");
	try
	{
		var json=[];
		json.conversationID=req.body.conversationId;
		json.message=req.body.message;
		json.clientId=req.body.clientId;
		conversation.insertConversationCustomer(json);
		res.statusCode=200;
		res.send("0");
	}
	catch(err)
	{
		res.statusCode=200;
		res.send("1,Problem with insert");
	}
	//res.end();
};

exports.getCategories = function(req, res){
	console.log("Inside get Categories Request");
	//console.log(req.body);
	if(!req.body.hasOwnProperty('clientId')) {
		console.log("Request does not have Client ID");
		res.statusCode = 400;
		return res.send('1, Error 400: Post syntax incorrect.');
	}
	console.log("Client ID : " + req.body.clientId);
	//res.set('Content-Type', 'text/plain');
	res.statusCode=200;
	categories.findCategoriesDBByClient(function(cats, err){
		if(err)
			console.log(err);
		else
		{
			var status="offline"
				client.getClientFlag(function(err, result){
					if(err)
						console.log("Error is : " + err);
					else
					{
						console.log("Status for client " + req.body.clientId + " is: " + result);
						status=result;
					}
					var cat= cats.replace(/\,/g,":");
					console.log(cat);
					var categories= "0," + cat + "," + status;
					console.log(categories);
					res.send(categories);
				}, req.body.clientId);

		}
	}, req.body.clientId);
};

//function replaceAll (find, replace, str) {
//return str.replace(new RegExp(find,'g'),replace);
//}

exports.submitTicket = function(req, res){
	console.log("Handling submit Ticket Request");

	if(!req.body.hasOwnProperty('clientId') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('message')|| !req.body.hasOwnProperty('email')|| !req.body.hasOwnProperty('category')) 
	{
		console.log("Request does not have a field which is req");
		res.statusCode = 400;
		return res.send('1, Error 400: Post syntax incorrect.');
	}
	else {

		var json=[];
		json.clientId=req.body.clientId;
		json.customerName=req.body.name;
		json.customerEmail=req.body.email;
		json.questionCategory=req.body.category;
		json.unreadFlag="unread";
		json.message=req.body.message;



		console.log("clientId: " +json.clientId);
		console.log("name : " + json.customerName);
		console.log("email : " + json.customerEmail);
		console.log("category : " + json.questionCategory);
		console.log("message : " + json.message);


		offline.insertOfflineMessage(json);	
	}
};




exports.initialRequest = function(req, res){
	console.log("handling initial request");
	
	if(!req.body.hasOwnProperty('clientId') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('message')|| !req.body.hasOwnProperty('email')|| !req.body.hasOwnProperty('category')) 
	{
		console.log("all fields required!!");
		res.statusCode = 400;
		return res.send('1, Error 400: Post syntax incorrect.');
	}
	else {
		console.log("name : " + req.body.hasOwnProperty('name'));
		var json=[];
		json.clientId=req.body.clientId;
		json.customerName=req.body.name;
		json.customerEmail=req.body.email;
		json.category=req.body.category;
		json.message=req.body.message;


		console.log("email : " +json.clientId);
		console.log("message : " + json.customerName);
		console.log("category : " + json.customerEmail);
		console.log("clientId : " + json.category);
		console.log("message  :"+json.message);

		res.statusCode=200;
		conversation.insertConversationInitialReq(json,function(err,result){
		res.render('conversation',{clientId:req.body.clientId,conv:result});

		});
		
		




	}
};



exports.knowledgeBase = function(req, res){

	if(!req.body.hasOwnProperty('clientId') ||  !req.body.hasOwnProperty('message')|| !req.body.hasOwnProperty('category')) 
	{		
		console.log("all the fields are required");

		res.statusCode = 400;
		return res.send('1, Error 400: Post syntax incorrect.');
	}
	else {

		var json=[];
		json.clientId=req.body.clientId;

		json.category=req.body.category;

		var list=req.body.message.split(" ");
		json.keywords=list;
		console.log("clientId : " + req.body.clientId);
		console.log("category : " + req.body.category);
		console.log("message : " + req.body.message);

		res.statusCode=200;
		
		res.send("0, Query matched Information from Knowledge Base.");

	}

//	/*ajax request to search in knowledge base*/

};







exports.custPollReq = function(req, res){

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

//	/*ajax request to search in knowledge base*/

};

function sayHello()
{
	console.log("Hello Poll");
}






