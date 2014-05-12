var MongoClient = require('mongodb').MongoClient;

function insertClient(json){

	/*
	 * The above JSON object passed as a parameter must be of the form:
	 * {"clientId":value,
	 * 	"password":value,
	 *  "clientName":value,
	 *  "clientEmail":value,
	 *  "domain":value,
	 *  "clientFlag":value}
	 */

	if(json.clientId && json.password && json.clientName && json.clientEmail && json.domain){

		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err) throw err;
			else
			{	
				db.collection("clientDB", function (err, connection){
					connection.insert({"clientId":json.clientId,"password":json.password,"clientName":json.clientName,"clientEmail":json.clientEmail,"domain":json.domain,"clientFlag":json.clientFlag},function (err,result){
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
		console.log("Insufficient Data.");
	}
}

exports.insertClient = insertClient;


function updateClient(json){

	/*
	 * The above JSON object passed as a parameter must be of the form:
	 * {"clientId":value,
	 * 	"password":value,
	 *  "clientName":value,
	 *  "clientEmail":value,
	 *  "domain":value,
	 *  "clientFlag":value}
	 */

	if(json.clientId && json.password && json.clientName && json.email && json.domain){

		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err){
				console.log("Error: "+err);
			}
			else
			{	
				db.collection("clientDB", function (err, connection){
					connection.save(json,function (err,result){
						if(err)
							console.log(err);
						else
							console.log("Successfully Updated.");
					});
				});
			}

		});
	}
	else{
		console.log("Insufficient Data.");
	}
}

exports.updateClient = updateClient;	


function removeClient(json){

	/*
	 * The above JSON object passed as a parameter must be of the form:
	 * {"clientId":value,
	 * 	"password":value,
	 *  "clientName":value,
	 *  "clientEmail":value,
	 *  "domain":value,
	 *  "clientFlag":value}
	 */


	if(json.clientId && json.password && json.clientName && json.email && json.domain){

		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err) throw err;
			else
			{
				db.collection("clientDB", function (err, connection){
					connection.remove(json,function (err,result){
						if(err)
							console.log(err);
						else
							console.log("Successfully Removed");
					});
				});
			}
		});
	}
	else{
		console.log("Insufficient Data.");
	}
}

exports.removeClient = removeClient;


function findAllClients(callback){

	/*This function will return all the clients. No need tp pass any JSON object*/


	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		if(err) throw err;
		else
		{
			db.collection("clientDB", function (err, connection){
				if(err){
					console.log("No such database exists.");
				}
				else{
					connection.find(function(err,res){
						if(err){
							console.log("No client exists.");
						}
						else{
							callback(res,err);
						}
					});
				}

			});
		}
	});
}
exports.findAllClients = findAllClients;

function findClientByID(callback,clientId){

	/*The JSON object needs to pass the client ID, to extract all other details.*/

	if(clientId){

		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err) throw err;
			else
			{
				db.collection("clientDB", function (err, connection){
					if(err){
						console.log("No such database exists.");
					}
					else{
						connection.find({"clientId":clientId},function(err,res){
							if(err){
								console.log("No such client exists.");
							}
							else{

								var cat;
								res.toArray(function(err,docs){
									if(!docs.length==0)
									{
										cat = docs[0].clientId;
										cat = cat.concat(":");
										cat = cat.concat(docs[0].clientName);
										cat = cat.concat(":");
										cat = cat.concat(docs[0].clientEmail);
										cat = cat.concat(":");
										cat = cat.concat("ClientFlag " + docs[0].clientFlag);
										cat = cat.concat(":");
										cat = cat.concat(docs[0].domain);

										for(var i=1; i<docs.length;i++)
										{

											cat = cat.concat(",");

											cat = cat.concat(docs[i].clientId);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].clientName);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].clientEmail);
											cat = cat.concat(":");
											cat = cat.concat("ClientFlag " + docs[0].clientFlag);
											cat = cat.concat(":");
											cat = cat.concat(docs[i].domain);
										}
									}
									callback(err,cat);
								});

							}
						});
					}

				});
			}
		});
	}
	else{
		console.log("Insufficient Data.");
	}
}

exports.findClientByID = findClientByID;

function validateClientLogin(callback,json){

	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		if(err) throw err;
		else
		{
			//var connection = client.clientDBConnection;
			db.collection("clientDB", function (err, connection){
				if(err){
					console.log("No such database exists.");
				}
				else{
					connection.find({"clientId":json.clientId,"password": json.password},function(err,res){
						if(err){
							console.log("UserID or Password Incorrect");
						}
						else if(res)
						{
							var cID;
							var pwd;
							res.toArray(function(err,docs){
								if(!docs.length==0)
								{
									//console.log(docs);
									cID = docs[0].clientId;
									pwd = docs[0].password;

									if(json.clientId==cID && json.password == pwd)
									{
										console.log(cID+" "+pwd+ " ");
										authenticated = 1;
										console.log("Client Authenticated");
										callback(err,authenticated);
									}
									else
									{
										//console.log(json.clientId+" "+json.password+ " ");
										authenticated = 0;
										console.log("Client Not Authenticated");
										callback(err,authenticated);
									}
								}
								else{
									console.log("ERROR.");
								}
							});
						}


						else{
							console.log("Incorrect Password.");
						}

					});

				}
			});
		}
	});
}

exports.validateClientLogin = validateClientLogin;

function changeClientPassword(json){

	var permission = validateClientLogin(json);

	if(permission == 1){
		//code to receive new password input from the client, in the form of JSON object newPass
		//newPass should contain {"customerID":value, "password":value}
		updateClient(json);
	}
	else{
		console.log("Not Authorized to change details of client.");
	}

}

exports.changeClientPassword = changeClientPassword;


function setClientFlag(clientId){

//	The json object must have clientId and clientFlag {"clientId":value,"clientFlag":value}

	if(clientId){

		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err) throw err;
			else
			{
				db.collection("clientDB", function (err, connection){
					if(err){
						console.log("No such database exists.");
					}
					else{
						connection.update({"clientId":clientId},{$set:{"clientFlag":"online"}},function(err,res){
							if(err){
								console.log("No such client exists.");
							}
							else{console.log("Flag Set.");}
						});
					}
				});
			}
		});
	}
	else{
		console.log("Insufficient Data.");
	}

}

exports.setClientFlag = setClientFlag;

function setClientFlagOffline(clientId){

//	The json object must have clientId and clientFlag {"clientId":value,"clientFlag":value}

	if(clientId){

		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err) throw err;
			else
			{
				db.collection("clientDB", function (err, connection){
					if(err){
						console.log("No such database exists.");
					}
					else{
						connection.update({"clientId":clientId},{$set:{"clientFlag":"offline"}},function(err,res){
							if(err){
								console.log("No such client exists.");
							}
							else{console.log("Flag Set.");}
						});
					}
				});
			}
		});
	}
	else{
		console.log("Insufficient Data.");
	}

}

exports.setClientFlagOffline = setClientFlagOffline;



function getClientFlag(callback,clientId){


//	The json object must have clientId {"clientId":value}

	if(clientId){

		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			if(err){throw err;}

			else
			{
				db.collection("clientDB", function (err, connection){
					if(err){
						console.log("No such database exists.");
					}
					else{
						connection.find({"clientId":clientId},function(err,res){
							if(err){
								console.log("No such client exists.");
							}
							else{
								var cat;
								res.toArray(function(err,docs){

									if(docs)
									{
										cat = docs[0].clientFlag;
										callback(err,cat);
									}
								});
							}
						});
					}
				});
			}
		});
	}
	else{
		console.log("Insufficient Data.");
	}
}

exports.getClientFlag = getClientFlag;