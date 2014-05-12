var client = require('./clientDB.js');

var conversation = require('./conversationDB.js');

var knowledge = require('./knowledgeDB.js');

var offline = require('./offlineDB.js');

var categories = require('./CategoriesDB.js');

/*
 * CLIENT Database Schema
 * The above JSON object passed as a parameter must be of the form:
 * {"clientId":value,
 * 	"password":value,
 *  "clientName":value,
 *  "email":value,
 *  "domain":value,
 *  "clientFlag":value}
 */

//client.updateClient({"clientId":"10001","password":"trial","clientName":"Demo","email":"hello@ask.com","domain":"www.logIn.com","clientFlag":"online"},{"clientId":"10001","password":"trial","clientName":"Demo","email":"hello@ask.com","domain":"www.logIn.com","clientFlag":"offline"})
//client.insertClient({"clientId":"10010","password":"trial","clientName":"Demo","email":"hello@ask.com","domain":"www.example.com","clientFlag":"offline"})
//working//client.removeClient({"clientId":"10001","password":"trial","clientName":"Demo","email":"hello@ask.com","domain":"www.logIn.com","clientFlag":"offline"});

/*
client.findClientByID(function(err,res){
	if(err){
		console.log("Error.");
	}
	else{
		console.log(res);
	}
},"10001");

*/
//client.setClientFlag({"clientId":"10005","clientFlag":"online"});


client.getClientFlag(function(err,res){
	if(err){
		console.log("Error.");
	}
	else{
		console.log(res);
	}
},"10005");


/*
 * 
*/
/*
var json = [];
json.clientId="10010";
json.password="trial";

client.validateClientLogin(function(err,res){
	if(err){
		//console.log(err);
	}
	else{
		console.log(res);
	}
},json);

*/


/* OFFLINE Database Schema
 * The above JSNON object must be of the form:
 * {"clientID":value,
 * 	"customerName":
 * 	"timeStamp":value,
 *  "customerEmail":value,
 *  "unreadFlag":value,
 *  "questionCategory":value,
 *  "message":value}
 */
/*
var json = [];
json.clientId="10012";
json.customerName="Saideepak";
json.questionCategory="TimepassCategory";
json.customerEmail="saideepak@gmail.com";
json.message="hello";
json.unreadFlag="unread";

offline.insertOfflineMessage(json/*{"clientId":"10015","customerName":"Saideepak","questionCategory":"TimepassCategory","customerEmail":"saideepak@gmail.com","message":"hello","unreadFlag":"unread"}*/
/*offline.findOfflineMessageByClient(function(err,res){
	if(err)
		console.log("Error.");
	else
		console.log(res);
},"10012");
*/
/*
clientId="10010";
password="trial";

client.validateClientLogin(function(err,res){
	if(err){
		//console.log(err);
	}
	else{
		console.log(res);
	}
},clientId,password);
*/






/*
 * CONVERSATION Database Schema
 * The above JSNON object must be of the form:
 * {"clientId":value,
 * 	"customerName":value,
 * 	"customerEmail":value,
 * 	"category":value,
 * 	"conversationID":value,
 *  "timeStamp":value,
 *  "message":value}
 */


//Conversations Data
/*
conversation.insertConversationInitialReq({"clientId":"GattuPally","customerName":"tully","customerEmail":"tp1@gmail.com","category":"sf","message":"Hi"},function(err,res){
	if(!err)
		console.log(res);
});
*/

//conversation.insertConversationRegular({"clientId":"abcdefgh","customerName":"starbucks","customerEmail":"hahaha@yahoo.com","category":"sj","timeStamp":"01:11","message":"Hello"});


/*
 * 
conversation.findConversationByClient(function(err,res){
	if(!err)
		console.log(res);
	else
		console.log(err);
},"gattu");

 */
/*
conversation.findConversationByClient(function(err,res){
	if(!err)
		console.log(res);
	else
		console.log(err);
},"gattu");
*/
//{"clientId":"10010","password":"trial"}

// CATAGORIES Database All working. Check Test.js



conversation.getConversationsBetweenT1AndT2(function(err,res){
	if(!err)
		console.log(res);
},{"t1":1399799896452,"clientId":"GATTU",});



//var d = new Date();
//var timeStamp = d.getTime()
//"time in Milliseconds since midnight jan 1st 1970: "+timeStamp);
//json.timeStamp = timeStamp;
//console.log(timeStamp);

