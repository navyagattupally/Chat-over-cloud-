var category = require('./CategoriesDB.js');

var client = require('./clientDB.js');

var conversation = require('./conversationDB.js');

var knowledge = require('./knowledgeDB.js');

var offline = require('./offlineDB.js');

//categories Data
//
//category.insertCategoriesDB({"clientId":"Honda","category":"SUV"});
//category.insertCategoriesDB({"clientId":"Honda","category":"Hatchback"});
//category.insertCategoriesDB({"clientId":"Honda","category":"Sedan"});
//category.insertCategoriesDB({"clientId":"Honda","category":"Coupe"});
//category.insertCategoriesDB({"clientId":"Honda","category":"Electric"});
//
//category.insertCategoriesDB({"clientId":"Nissan","category":"SUV"});
//category.insertCategoriesDB({"clientId":"Nissan","category":"Hatchback"});
//category.insertCategoriesDB({"clientId":"Nissan","category":"Sports Range"});
//category.insertCategoriesDB({"clientId":"Nissan","category":"Hybrid"});
//category.insertCategoriesDB({"clientId":"Nissan","category":"Sedan"});
//
//category.insertCategoriesDB({"clientId":"Levis","category":"printed t-shirts"});
//category.insertCategoriesDB({"clientId":"Levis","category":"polo t-shirts"});
//category.insertCategoriesDB({"clientId":"Levis","category":"with collar t-shits"});
//category.insertCategoriesDB({"clientId":"Levis","category":"classic jeans"});
//category.insertCategoriesDB({"clientId":"Levis","category":"denim jeans"});
//
//category.insertCategoriesDB({"clientId":"J.Crew","category":"Jackets"});
//category.insertCategoriesDB({"clientId":"J.Crew","category":"Leather Shoes"});
//category.insertCategoriesDB({"clientId":"J.Crew","category":"Mens' Accessories"});
//category.insertCategoriesDB({"clientId":"J.Crew","category":"Womens' Accessories"});
//category.insertCategoriesDB({"clientId":"J.Crew","category":"Apparel"});
//
//category.insertCategoriesDB({"clientId":"TuxAndBucks","category":"printedd t-shirts"});
//category.insertCategoriesDB({"clientId":"TuxAndBucks","category":"polo t-shirts"});
//category.insertCategoriesDB({"clientId":"TuxAndBucks","category":"collar neck t-shirts"});
//category.insertCategoriesDB({"clientId":"TuxAndBucks","category":"classic jeans"});
//category.insertCategoriesDB({"clientId":"TuxAndBucks","category":"denim jeans"});
//


/*
 * The above JSON object passed as a parameter must be of the form:
 * {"clientId":value,
 * 	"password":value,
 *  "clientName":value,
 *  "clientEmail":value,
 *  "domain":value,
 *  "clientFlag":value}
 
 */
//Clients Mock Data
//
//client.insertClient({"clientId":"Honda","password":"adminLogin","clientName":"Honda Motors","clientEmail":"pr@honda.com","domain":"www.honda.com","clientFlag":"offline" });
//client.insertClient({"clientId":"Nissan","password":"adminLogin","clientName":"Nissan Motors","clientEmail":"customercare@nissan.com","domain":"www.nissan.com","clientFlag":"offline"});
//client.insertClient({"clientId":"Levis","password":"adminLogin","clientName":"Levis","clientEmail":"","domain":"support@levis.com","clientFlag":"offline"});
//client.insertClient({"clientId":"J.Crew","password":"adminLogin","clientName":"J.Crew","clientEmail":"admin@jcrew.com","domain":"www.jcrew.com","clientFlag":"offline"});
//client.insertClient({"clientId":"TuxAndBucks","password":"adminLogin","clientName":"TuxAndBucks","clientEmail":"proprietor@TuxAndBucks.com","domain":"www.TuxAndBucks.com","clientFlag":"online"});

/*
 * The above JSON object must be of the form:
 * {"clientID":value,
 * 	"keywords":["value1","value2"...],
 *  "questionCategory":value,
 * 	"question":value,
 * 	"answer":value
 */

//KnowledgeDB Data
//
//knowledge.insertKnowledgeDBMessage({"clientId":"Honda","keywords":"battery","questionCategory":"battery","question":"The BATTERY CHARGE LOW or BATT LOW warning message on my dash is on. What does that mean and what should I do?","answer":"For vehicles equipped with the Battery Management System, this message occurs when the battery’s State of Charge has dropped below a predetermined level. The message is intended to inform you that the battery requires charging to guarantee proper performance under all conditions (extremely cold conditions, high electrical system demands, etc)."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Honda","keywords":"change oil","questionCategory":"Oil Maintenance","question":"How often do I need to change the oil in my vehicle?","answer":"There are many variables that determine how often an oil change is needed (climate, drive time, highway or city street driving, etc.). You should refer to the Scheduled Maintenance section in the appropriate owner's manual for specific information."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Honda","keywords":"salvage","questionCategory":"salvage","question":"If my vehicle has a branded or Salvage title, is the warranty still valid?","answer":"Honda vehicles with titles that have been branded as salvaged, scrapped, or dismantled are no longer covered by the new car warranty, with the exception of some emissions warranties and safety recalls. For further information regarding the branding of vehicle titles, please contact your state's department of motor vehicles."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Honda","keywords":"PAX tires","questionCategory":"tires","question":"What are PAX Tires?","answer":"The PAX Tire System is the latest in run-flat tire technology that, in the event of a tire puncture, allows a driver to remain in control of the vehicle and continue driving for up to 125 miles at speeds up to 50 miles an hour on a deflated tire. For more information on PAX tires, go to http://www.michelinman.com/michelincom/automotive-tires/michelin-pax.page."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Honda","keywords":"warranty","questionCategory":"repair costs","question":"Where can I find Warranty information for my Honda vehicle?","answer":"Warranty information can be found in a number of different places. The most complete warranty information can be found in the Warranty booklet supplied with your vehicle. If the Warranty booklet is no longer with the vehicle, the same information can be found online through the Honda Owners Site. To access the information in Honda Owners Site, you must first register and enter your vehicle information. The warranty information can then be accessed for each vehicle. To register for a Honda Owners Site account, go to the Honda Owners Site website: owners.honda.com "});

//knowledge.insertKnowledgeDBMessage({"clientId":"Nissan","keywords":"key1","questionCategory":"category","question":"what?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Nissan","keywords":"key2","questionCategory":"category","question":"hello?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Nissan","keywords":"key3","questionCategory":"category","question":"what?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Nissan","keywords":"key4","questionCategory":"category","question":"hello?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Nissan","keywords":"key5","questionCategory":"category","question":"what?","answer":"This Way."});
//
//knowledge.insertKnowledgeDBMessage({"clientId":"Levis","keywords":"key1","questionCategory":"category","question":"what?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Levis","keywords":"key2","questionCategory":"category","question":"hello?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Levis","keywords":"key3","questionCategory":"category","question":"what?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Levis","keywords":"key4","questionCategory":"category","question":"hello?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"Levis","keywords":"key5","questionCategory":"category","question":"what?","answer":"This Way."});
//
//knowledge.insertKnowledgeDBMessage({"clientId":"J.Crew","keywords":"key1","questionCategory":"category","question":"what?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"J.Crew","keywords":"key2","questionCategory":"category","question":"hello?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"J.Crew","keywords":"key3","questionCategory":"category","question":"what?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"J.Crew","keywords":"key4","questionCategory":"category","question":"hello?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"J.Crew","keywords":"key5","questionCategory":"category","question":"what?","answer":"This Way."});
//
//knowledge.insertKnowledgeDBMessage({"clientId":"TuxAndBucks","keywords":"cotton","questionCategory":"cotton","question":"what?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"TuxAndBucks","keywords":"silk","questionCategory":"cotton","question":"hello?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"TuxAndBucks","keywords":"tshirt","questionCategory":"silk","question":"what?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"TuxAndBucks","keywords":"shirt","questionCategory":"silk","question":"hello?","answer":"This Way."});
//knowledge.insertKnowledgeDBMessage({"clientId":"TuxAndBucks","keywords":"t-shirt","questionCategory":"denim","question":"what?","answer":"This Way."});


/*
 * The above JSNON object must be of the form:
 * {"clientID":value,
 * 	"timeStamp":value,
 *  "customerEmail":value,
 *  "unreadFlag":value,
 *  "message":value}
 */
/*
offline.insertOfflineMessage({"clientId":"Honda","customerEmail":"customer1@gmail.com","unreadFlag":"0","message":"message1"});
offline.insertOfflineMessage({"clientId":"Nissan","customerEmail":"customer2@gmail.com","unreadFlag":"0","message":"message2"});
offline.insertOfflineMessage({"clientId":"Levis","customerEmail":"customer3@gmail.com","unreadFlag":"0","message":"message3"});
offline.insertOfflineMessage({"clientId":"J.Crew","customerEmail":"customer4@gmail.com","unreadFlag":"0","message":"message4"});
offline.insertOfflineMessage({"clientId":"TuxAndBucks","customerEmail":"customer5@gmail.com","unreadFlag":"0","message":"message5"});

*/
