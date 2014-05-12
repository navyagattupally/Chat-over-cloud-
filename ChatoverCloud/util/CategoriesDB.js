var MongoClient = require('mongodb').MongoClient;

function insertCategoriesDB(json){
	
	/*
	 * The above JSON object must be of the form:
	 * {"clientID":value,
	 * 	"category":value}
	 */
		
	if(json.clientId && json.category){
	
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			  if(err) throw err;
			  else
				{
				  db.collection("CategoriesDB", function (err, connection){
					  connection.insert({"clientId":json.clientId,"category":json.category}, function(err,res){
						  if(!err){
							  console.log('Insert Operation Successful.');	
						  }
						  else{
							  console.log('Error in Insertion.');
						  }
					  });
					});
				}
			});
		}
	else{
		console.log("error!!!");
	}
}
	
	


exports.insertCategoriesDB = insertCategoriesDB;

function updateCategoriesDB(json){
	
	/*
	 * The above JSON object must be of the form:
	 * {"clientID":value,
	 * 	"category":value}
	 */
	
	if(json.clientID && json.category){
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			  if(err) throw err;
			  else
				{
				  db.collection("CategoriesDB", function (err, connection){	
					  connection.update(json, function(err,res){
						  if(!err){
							  console.log('Update Operation Successful.');	
						  }
						  else{
							  console.log('Error in Updating Collection.');
						  }
					  });
					});
				}
			});
		}
	
	else{
		console.log("Insufficient data.")
	}
}


exports.updateCategoriesDB = updateCategoriesDB;

function removeCategoriesDB(json){

	/*
	 * The above JSON object must be of the form:
	 * {"clientID":value,
	 * 	"category":value}
	 */
	
	if(json.clientID && json.Category){
		MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
			  if(err) throw err;
			  else
				{
				  db.collection("CategoriesDB", function (err, connection){	
					  connection.remove(json, function(err,res){
						  if(!err){
							  console.log('Remove Operation Successful.');	
						  }
						  else{
							  console.log('Error in Removing Category.');
						  }
					  });
					});
				}
			});
		}
	
	else{
		console.log("Insufficient data.")
	}
}

exports.removeCategoriesDB = removeCategoriesDB;

function findAllCategoriesDB(callback){
	
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		  if(err) throw err;
		  else
			{
			  db.collection("CategoriesDB", function (err, connection){
				  connection.find(function(err, results){
					  if(!err){
						  
						  var cat;
							results.toArray(function(err,docs){
								if(!docs.length==0)
									{
										//cat2=docs[0].category;
										cat = docs[0].clientID;
										cat = cat.concat(":");
										cat = cat.concat(docs[0].category);
										for(var i=1; i<docs.length;i++)
											{
												cat = cat.concat(",");
												cat = cat.concat(docs[i].clientID);
												cat = cat.concat(":");
												cat = cat.concat(docs[i].category);
											}
									}
								callback(cat);
							});
					  }
					  else{
						  console.log(err);
					  }
				  });
			  });
			}
	});
}


exports.findAllCategoriesDB = findAllCategoriesDB;

function findCategoriesDBByClient(callback,clientId){
	/*
	 * The above JSON object must contain the clientID in the form: {"clientID":value}
	 */
	
	if(clientId){
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		  if(err) throw err;
		  else
			{
			  db.collection("CategoriesDB", function (err, connection){
				  connection.find({"clientId": clientId},function(err, results){
					  if(!err){
						  
						  var cat;
							results.toArray(function(err,docs){
								if(!docs.length==0)
									{
										cat=docs[0].category;
										for(var i=1; i<docs.length;i++)
											{
												cat = cat.concat(",");
												cat = cat.concat(docs[i].category);
											}
									}
								callback(cat,err);
							});
					  }
					  else{
						  console.log(err);
					  }
				  });
			  });
			}
	});
	}
	else{
		console.log("Incomplete Data.");
	}
}

exports.findCategoriesDBByClient = findCategoriesDBByClient;

function removeCategoriesDBByClient(json){
	
	/*The above JSON object must contain the ClientID and question in the format: {"clientID":value, "question":value}*/
	MongoClient.connect('mongodb://127.0.0.1:27017/chatDB', function(err, db) {
		  if(err) throw err;
		  else
			{
			  db.collection("CategoriesDB", function (err, connection){
				  connection.remove({"clientID:":json.clientID},function(err,res){
					  if(err){
						  console.log("No such question");
					  }
					  else{
						  console.log("Removed the question & answer of the particular client provided");
					  }
				  });
			  });
			}
	});
}

exports.removeCategoriesDBByClient = removeCategoriesDBByClient;


