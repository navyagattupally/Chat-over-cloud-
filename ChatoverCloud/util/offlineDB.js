var MongoClient = require('mongodb').MongoClient;

function insertOfflineMessage(json){
	
	/*
	 * The above JSNON object must be of the form:
	 * {"clientId":value,
	 * 	"customerName":
	 * 	"timeStamp":value,
	 *  "customerEmail":value,
	 *  "unreadFlag":value,
	 *  "questionCategory":value,
	 *  "message":value}
	 */

	var d = new Date();
	var timeStamp = d.getTime()
	//"time in Milliseconds since midnight jan 1st 1970: "+timeStamp);
	json.timeStamp = timeStamp;
	
	if(json.clientId && json.customerName && json.questionCategory && json.timeStamp && json.customerEmail && json.message){
	
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			  if(err) throw err;
			  else
				{
				  db.collection("offlineDB", function (err, connection){
				  		connection.insert({"clientId":json.clientId,"customerName":json.customerName,"questionCategory":json.questionCategory,"timeStamp":json.timeStamp,"message":json.message,"unreadFlag":json.unreadFlag},function (err,result){
				  			if(err)
				  				console.log(err);
				  			else
					  			console.log("Successfully Inserted");
					  	});
					  });
				}	  
			});
	}
	else{
		console.log("Insufficient data.");
	}
}

exports.insertOfflineMessage = insertOfflineMessage;


function updateOfflineMessages(json){
	
	/*
	 * The above JSNON object must be of the form:
	 * {"clientID":value,
	 * 	"customerName":
	 * 	"timeStamp":value,
	 *  "customerEmail":value,
	 *  "unreadFlag":value,
	 *  "questionCategory":value,
	 *  "message":value}
	 */
	
	if(json.clientId && json.timeStamp && json.customerEmail && json.unreadFlag && json.message){
		
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			  if(err) throw err;
			  else
				{
				  db.collection("offlineDB", function (err, connection){
				  		connection.update(json,function (err,result){
				  			if(err)
				  				console.log(err);
				  			else
					  			console.log("Successfully Updated");
					  	});
					  });
				}	  
			});
	}
	else{
		console.log("Insufficient data.");
	}
}

exports.updateOfflineMessages = updateOfflineMessages;

function removeOfflineMessages(json){
	
	/*
	 * The above JSNON object must be of the form:
	 * {"clientID":value,
	 * 	"customerName":
	 * 	"timeStamp":value,
	 *  "customerEmail":value,
	 *  "unreadFlag":value,
	 *  "questionCategory":value,
	 *  "message":value}
	 */

	if(json.clientId && json.timeStamp && json.customerEmail && json.unreadFlag && json.message){
	
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			  if(err) throw err;
			  else
				{
				  db.collection("offlineDB", function (err, connection){
				  		connection.remove(json,function (err,result){
				  			if(err)
				  				console.log(err);
				  			else
					  			console.log("Successfully removed offline messages.");
					  	});
					  });
				}	  
			});
	}
	else{
		console.log("Insufficient data.");
	}
}

exports.removeOfflineMessages = removeOfflineMessages;

function findAllOfflineMessages(callback){
	
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		  if(err) throw err;
		  else
			{
			  db.collection("offlineDB", function (err, connection){
				  connection.find(function(err, results){
					  if(!err){
						  callback(results,err);
					  }
					  else{
						  console.log(err);
					  }
				  });
			  });
			}
	});
}

exports.findAllOfflineMessages = findAllOfflineMessages;

function findOfflineMessageByClient(callback,clientId){
	/*The above JSON object must have the clientID in the manner: {"clientID":value}*/
	
	if(clientId){
	
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		  if(err) throw err;
		  else
			{
			  db.collection("offlineDB", function (err, connection){
				  
			  connection.find({"clientId":clientId,"unreadFlag":"unread"},function(err,res){
				  if(err){
					  console.log("The client has no unread messages");
				  }
				  else{
					  
					  var cat;
						res.toArray(function(err,docs){
							if(!docs.length==0)
								{
									cat=docs[0].timeStamp;
									cat = cat + ":";
									cat = cat.concat(docs[0].customerName);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].customerEmail);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].questionCategory);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].message);
	
									for(var i=1; i<docs.length;i++)
										{
											cat = cat.concat(",");
											
											cat = cat.concat(docs[i].timeStamp);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].customerName);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].customerEmail);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].questionCategory);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].message);
										}
								}
							callback(err,cat);
						});
				  }
			  });
		 });
		}
	});
	}
	else{
		console.log("Insufficient Data.");
	}
}

exports.findOfflineMessageByClient = findOfflineMessageByClient;

function removeReadOfflineMessagesByClient(json){
	/*The above JSON object must have the client ID in the manner: {"clientID":value}*/
	if(json.clientId){

	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		  if(err) throw err;
		  else
			{
			  db.collection("offlineDB", function (err, connection){
				  connection.remove({"clientId:":json.clientId, "unreadFlag":{$in:[0,"unread","0"]}},function(err,res){
					  if(err)
						  console.log("Error removing documents");
					  else
						  console.log("Removed read messages of the client.");
				  });
			  });
			}
	});
	}
	else{
		console.log("Insufficient Data.");
		}
}

exports.removeReadOfflineMessagesByClient = removeReadOfflineMessagesByClient;


function changeUnreadFlag(json){
	if(json.clientId && json.conversationID && json.unreadFlag){
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			  if(err) throw err;
			  else{
				  
				  db.collection("offlineDB", function (err, connection){
					  
					  if(!err){	
						  connection.update({"clientId":json.clientId},{$set:{"unreadFlag":"read}"}},{ multi: true });
					  }
					  else{
						  console.log("Error");
					  }
				  });
			}
		});
	}
	else{
		console.log("Insufficient Data.");
	}
}

					  
exports.changeUnreadFlag = changeUnreadFlag;