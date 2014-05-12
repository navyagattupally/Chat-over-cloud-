/**
 * New node file
 */

/*	CLIENT COLLECTION SCHEMA
 * 
 * {"clientId":value,
 * 	"password":value,
 *  "clientName":value,
 *  "clientEmail":value,
 *  "domain":value,
 *  "clientFlag":value}
 */

/*
 * FUNCTIONS
 * 
 * insertClient(json) : for inserting client. Requires: {"clientId":json.clientId,"password":json.password,"clientName":json.clientName,"clientEmail":json.clientEmail,"domain":json.domain,"clientFlag":json.clientFlag}
 * removeClient(json) : for removing client. Requires: {"clientId":json.clientId, "password":json.password,"clientName": json.clientName,"clientEmail":json.email,"domain": json.domain}
 * findClientByID(callback,clientId) : for finding client information by clientId. Requires: {"clientId":json.clientId}
 * validateClientLogin(callback,json) : for client login. Requires: {"clientId":json.clientId,"password": json.password}
 * setClientFlag(clientId) : for setting the client flag to online. Requires: "clientId"
 * setClientFlagOffline(clientId): for setting the client flag to offline. Requires: "clientId"
 * getClientFlag(callback,clientId): for getting the client flag. Requires: "clientId" 
 */



/*	CATEGORIES COLLECTION SCHEMA
 * 
 * {"clientID":value,
 * 	"category":value}
 */

/*
 * FUNCTIONS
 * 
 * insertCategoriesDB(json): for inserting categories. Requires: {"clientId":json.clientId, "category":json.category}
 * findCategoriesDBByClient(callback,clientId): for finding the categries of a client. Requires: {"clientId": clientId}
 * 
 */


/*
 * CONVERSATIONS COLLECTION SCHEMA
 * 
 * The above JSNON object must be of the form:
 * {"clientID":value,
 * 	"customerName":value,
 * 	"customerEmail":value,
 * 	"category":value,
 * 	"conversationID":value,
 *  "timeStamp":value,
 *  "message":value}
 */

/*
 * 	FUNCTIONS
 * 
 * insertConversationInitialReq(json,callback): for initial request from customer to client. Requires: {"clientId":json.clientId,"customerName":json.customerName,"customerEmail":json.customerEmail,"category":json.category,"message":json.message}
 * insertConversationClient(json): for admin to reply to customer. Requires: conversationID, message.
 * findConversationByClient(callback,clientId): to find conversations by clientId. Requires: clientId.
 * findConversationByClientandConversationID(callback,json): to find conversation bu clientId and ConversationID. Requires: {"clientID":json.clientID,"conversationID":json.conversationID}
 * getConversationsGreaterThanT1(callback,json) Requires: timeStamp, conversationID, and clientID = "null"
 * initialPoll(callback,json) Requires: timeStamp, conversationID, clientId 
 */
