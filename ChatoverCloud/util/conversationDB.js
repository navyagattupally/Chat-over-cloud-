var MongoClient = require('mongodb').MongoClient;

function insertConversationInitialReq(json,callback){
	
	//Save conversationId in the Database.
	
	/*
	 * The above JSNON object must be of the form:
	 * {"clientID":value,
	 * 	"customerName":value,
	 * 	"customerEmail":value,
	 * 	"category":value,
	 * 	"conversationID":value,
	 *  "timeStamp":value,
	 *  "message":value}
	 */

	// if(json.clientId && json.customerName && json.category &&json.customerEmail && json.timeStamp){
	
	var d = new Date();
	var timeStamp = d.getTime()
	//"time in Milliseconds since midnight jan 1st 1970: "+timeStamp);
	json.timeStamp = timeStamp;
	
	//Auto Generating conversationID
	json.conversationID = (json.clientId) + (json.timeStamp);
	console.log(json.conversationID);
	//console.log("HERE");
		 
		 
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		  if(err) throw err;
		  else
			{
			 	  db.collection("conversationDB", function (err, connection){
				  		connection.insert({"clientId":json.clientId,"customerName":json.customerName,"customerEmail":json.customerEmail,"category":json.category,"conversationID":json.conversationID,"timeStamp":json.timeStamp,"message":json.message},function (err,result){
				  			if(err)
				  				console.log(err);
				  			else
					  			console.log("Successfully Inserted");
				  				//connection.update({"conversationID":{$in:[]},"clientId":json.clientId},{"conversationID":json.conversationID})
				  			    callback(err,json.conversationID);
					});
				});
			}
		 });
	 } 
	// else{
		//	console.log("Incomplete data.");
	//}


exports.insertConversationInitialReq = insertConversationInitialReq;

function insertConversationCustomer(json){
	
	/*
	 * The above JSNON object must be of the form:
	 * {"clientID":value,
	 * 	"customerName":value,
	 * 	"customerEmail":value,
	 * 	"category":value,
	 * 	"conversationID":value,
	 *  "timeStamp":value,
	 *  "message":value,
	 *  "unreadFlag":value}
	 */

	 var d = new Date();
	 var timeStamp = d.getTime()
	 //"time in Milliseconds since midnight jan 1st 1970: "+timeStamp);
	 json.timeStamp = timeStamp;
	 
	 if(json.clientId && json.conversationID && json.timeStamp){
		 
		 MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		  if(err) throw err;
		  else
			{
			 	  db.collection("conversationDB", function (err, connection){
				  		connection.insert({"clientId":json.clientId,"conversationID":json.conversationID,"timeStamp":json.timeStamp,"message":json.message},function (err,result){
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
			console.log("Incomplete data.");
	}
}

exports.insertConversationCustomer = insertConversationCustomer;

function insertConversationClient(json){
	
	/*
	 * The above JSNON object must be of the form:
	 * {"clientID":value,
	 * 	"customerName":value,
	 * 	"customerEmail":value,
	 * 	"category":value,
	 * 	"conversationID":value,
	 *  "timeStamp":value,
	 *  "message":value,
	 *  "unreadFlag":value}
	 */

	 var d = new Date();
	 var timeStamp = d.getTime()
	 //"time in Milliseconds since midnight jan 1st 1970: "+timeStamp);
	 json.timeStamp = timeStamp;
	 
	 if(!json.clientId && json.conversationID && json.timeStamp){
		 
		 MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		  if(err) throw err;
		  else
			{
			 	  db.collection("conversationDB", function (err, connection){
				  		connection.insert({"clientId":"null","conversationID":json.conversationID,"timeStamp":json.timeStamp,"message":json.message},function (err,result){
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
			console.log("Incomplete data.");
	}
}

exports.insertConversationClient = insertConversationClient;



function updateConversation(json){
	/*
	 * The above JSNON object must be of the form:
	 * {"clientID":value,
	 * 	"customerName":value,
	 * 	"customerEmail":value,
	 * 	"category":value,
	 * 	"conversationID":value,
	 *  "timeStamp":value,
	 *  "message":value,
	 *  "unreadFlag":value}
	 */

	var d = new Date();
	var timeStamp = d.getTime()
	//"time in Milliseconds since midnight jan 1st 1970: "+timeStamp);
	json.timeStamp = timeStamp;
	
	if(json.clientID && json.customerName && json.category &&json.customerEmail && json.conversationID && json.timeStamp){
	
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		if(err) throw err;
		else
		{
			
				db.collection("conversationDB", function (err, connection){
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
		console.log("Insufficient Data.");
	}
}
				
exports.updateConversation = updateConversation;

function removeConversation(json){

	/*
	 * The above JSNON object must be of the form:
	 * {"clientID":value,
	 * 	"customerName":value,
	 * 	"customerEmail":value,
	 * 	"category":value,
	 * 	"conversationID":value,
	 *  "timeStamp":value,
	 *  "message":value,
	 *  "unreadFlag":value}
	 */

	if(json.clientID && json.customerName && json.category && json.customerEmail && json.conversationID && json.timeStamp){
		
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		if(err) throw err;
		else
		{
				db.collection("conversationDB", function (err, connection){
					connection.remove(json,function (err,result){
						if(err)
							console.log(err);
						else
							console.log("Successfully Removed.");
					});
				});
		}
	});
	}
	else{
		console.log("Insufficient Data.");
	}
}

exports.removeConversation = removeConversation;

function findAllConversations(callback){
	
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		if(err) throw err;
		else
		{
			db.collection("conversationDB", function (err, connection){
			connection.find(function(err, results){
				if(!err){
					callback(results,err);
				}
				
				});
			});
		}
	});
}

exports.findAllConversations = findAllConversations;

function findConversationByClient(callback,clientId){
	
	/*
	 * The above JSON object must contain the clientID in the form: {"clientID":value}
	 */
	if(clientId){
	
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		if(err) throw err;
		else
		{
			db.collection("conversationDB", function (err, connection){
			connection.find({"clientId":clientId},function(err,res){
				if(err){
					console.log("Incorrect Client Id");
				}
				else{
					 var cat;
						res.toArray(function(err,docs){
							if(!docs.length==0)
								{
									cat=docs[0].customerName;
									cat = cat.concat(":");
									cat = cat.concat(docs[0].customerEmail);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].category);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].conversationID);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].timeStamp);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].clientMessage);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].customerMessage);
									
									for(var i=1; i<docs.length;i++)
										{
											cat = cat.concat(",");
											
											cat = cat.concat(docs[i].customerName);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].customerEmail);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].category);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].conversationID);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].timeStamp);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].clientMessage);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].customerMessage);
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

exports.findConversationByClient = findConversationByClient;

function findConversationByClientandConversationID(callback,json){
	
	/*
	 * The above JSON object must contain the clientID in the form: {"clientID":value,"conversationID":value}
	 */
	if(json.clientId && json.conversationID){
	
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		if(err) throw err;
		else
		{
			db.collection("conversationDB", function (err, connection){
			connection.find({"clientID":json.clientID,"conversationID":json.conversationID},function(err,res){
				if(err){
					console.log("Incorrect Client ID");
				}
				else{
					
					 var cat;
						results.toArray(function(err,docs){
							if(!docs.length==0)
								{
									cat=docs[0].customerName;
									cat = cat.concat(":");
									cat = cat.concat(docs[0].customerEmail);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].category);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].conversationID);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].timeStamp);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].clientMessage);
									cat = cat.concat(":");
									cat = cat.concat(docs[0].customerMessage);
									
									for(var i=1; i<docs.length;i++)
										{
											cat = cat.concat(",");
											
											cat = cat.concat(docs[i].customerName);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].customerEmail);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].category);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].conversationID);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].timeStamp);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].clientMessage);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].customerMessage);
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

exports.findConversationByClientandConversationID = findConversationByClientandConversationID;

function findUnreadMessagesByClient(callback,json){
	
	/*The above JSON object should contain the Client ID in the form: {"clientID":value}*/
	
	if(json.clientID){
	
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		if(err) throw err;
		else
		{
			db.collection("conversationDB", function (err, connection){
				connection.find({"clientId:":json.clientId, "unreadFlag":{$in:[1]}},function(err,res){
					if(!err){
						
						 var cat;
							results.toArray(function(err,docs){
								if(!docs.length==0)
									{
										cat=docs[0].customerName;
										cat = cat.concat(":");
										cat = cat.concat(docs[0].customerEmail);
										cat = cat.concat(":");
										cat = cat.concat(docs[0].category);
										cat = cat.concat(":");
										cat = cat.concat(docs[0].conversationID);
										cat = cat.concat(":");
										cat = cat.concat(docs[0].timeStamp);
										cat = cat.concat(":");
										cat = cat.concat(docs[0].clientMessage);
										cat = cat.concat(":");
										cat = cat.concat(docs[0].customerMessage);
										
										for(var i=1; i<docs.length;i++)
											{
												cat = cat.concat(",");
												
												cat = cat.concat(docs[i].customerName);
												cat = cat.concat(":");
												cat = cat.concat(docs[i].customerEmail);
												cat = cat.concat(":");
												cat = cat.concat(docs[i].category);
												cat = cat.concat(":");
												cat = cat.concat(docs[i].conversationID);
												cat = cat.concat(":");
												cat = cat.concat(docs[i].timeStamp);
												cat = cat.concat(":");
												cat = cat.concat(docs[i].clientMessage);
												cat = cat.concat(":");
												cat = cat.concat(docs[i].customerMessage);
											}
									}
								callback(err,cat);
							});
						}
					else{
						console.log("Client has no unread messages");
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

exports.findUnreadMessagesByClient = findUnreadMessagesByClient;

function removeReadConversationByClient(json){
	
	/*The above JSON object should contain the Client ID in the form: {"clientID":value}*/
	if(json.clientID){
	
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		if(err) throw err;
		else
		{
			db.collection("conversationDB", function (err, connection){
				connection.remove({"clientID:":json.clientID, "unreadFlag":{$in:[0]}},function(err,res){
					if(err){
						console.log("Error removing documents");
					}
					else{
						console.log("Removed read messages of the client.");
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
exports.removeReadConversationByClient = removeReadConversationByClient;

function removeConversationByID(json){
	
	if(json.clientID && json.conversationID){
		
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err) throw err;
			else
			{
				db.collection("conversationDB", function (err, connection){
					connection.remove({"clientID":json.clientID,"conversationID":json.conversationID},function(err,res){
						if(err){
							console.log("Error Removing Conversation.");
						}
						else{
							console.log("Conversation Removed.");
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
	
exports.removeConversationByID = removeConversationByID;

function getConversationsGreaterThanT1(callback,json){
	/*Pass the begining time and end time as parameter to this function*/
	
	if(json.t1){
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err) throw err;
			else
			{
				db.collection("conversationDB", function (err, connection){
					if(!err){
					connection.find({"timeStamp":{$gt:parseInt(json.t1)},"clientId":"null","conversationID":json.conversationID}, function(err,res){
						
						if(!err){
							console.log("conversationID : " + json.conversationID + "  timestamp: " + json.t1);
							var cat;
							res.toArray(function(err,docs){
								var d = new Date();
								var timeStamp = d.getTime();
								cat=timeStamp;
								cat = cat +";";
								console.log("DOCS length : " +docs.length);
								if(!docs.length==0)
									{
										
										
										cat = cat.concat(docs[0].message);
										cat = cat +";";
										
										for(var i=1; i<docs.length;i++)
											{
												cat = cat.concat(";");
												
												cat = cat.concat(docs[i].message);
											}
										callback(err,cat);
										}
								else
									callback(err,cat);
									
								});
							}
							else{
								console.log(err);
							}
						}
					);
				}
				else{
					console.log(err);
				}
					
				});
			}
		});
	}
	else{
		console.log("Insufficient Data.");
	}
}

exports.getConversationsGreaterThanT1 = getConversationsGreaterThanT1;

function initialPoll(callback,json){
	/*Pass the begining time and end time as parameter to this function*/
	
	if(json.t1){
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err) throw err;
			else
			{
				db.collection("conversationDB", function (err, connection){
					if(!err){
					connection.find({"timeStamp":{$gt:parseInt(json.t1)},"clientId":json.clientId}, function(err,res){
						
						if(!err){
			
							var cat;
							res.toArray(function(err,docs){
								var d = new Date();
								var timeStamp = d.getTime()
								cat=timeStamp;
								if(!docs.length==0)
									{
										
										cat = cat +";";
										cat = cat.concat(docs[0].customerName);
										cat = cat.concat(";");
										cat = cat.concat(docs[0].conversationID);
										cat = cat.concat(";");
										cat = cat.concat(docs[0].message);
										
										callback(err,cat);
										}
								else
									callback(err,cat);
									
								});
							}
							else{
								console.log(err);
							}
						}
					);
				}
				else{
					console.log(err);
				}
					
				});
			}
		});
	}
	else{
		console.log("Insufficient Data.");
	}
}

exports.initialPoll = initialPoll;



