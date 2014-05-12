var conversation = require('./conversationDB.js');

/*
var abc = require('./CategoriesDB.js');

abc.findCategoriesDBByClient(function(res,err){
	if(!err){
		
		var sai=res.toArray();
		console.log(sai[0]);
		//console.log(res);
	}
},"dhiru")
*/
/*
var d = new Date();
var timeStamp = d.getTime()
console.log("time in Milliseconds since midnight jan 1st 1970: "+timeStamp);
		 
		 
var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}), "$1");
console.log("Time in hh:mm:ss "+myDate);

miliseconds = timeStamp

seconds = miliseconds/1000
console.log(Time.at(seconds).strftime("%H:%M:%S"));
		 
*/		 


//conversation.insertConversationInitialReq({"clientId":"Honda","customerName":"ranjan13","customerEmail":"tp1@gmail.com","category":"sf","message":"Hi server3"},function(err,res){
//	if(!err)
//		console.log(res);
//	else
//		console.log("error");
//});



conversation.insertConversationCustomer({"conversationID":"Honda1399903502726","message":"Happy monday run","clientId":"Honda"});
//var json =[];
//json.t1="1399900251678";
////json.conversationID= "Ranjan1399889100864";
//json.clientId="Honda";
//conversation.initialPoll(function(err,res){
//	if(!err){
//		res
//		console.log(res);
//	}
//},json);

//conversation.insertConversationClient(
//		{"conversationID":"Honda1399899122463","message":"Hello i am ba cant help tomorrow?"});