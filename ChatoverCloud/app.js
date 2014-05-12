var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require("ejs");
var app = express();
var customer = require("./routes/customer");
var admin = require("./routes/admin");


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(allowCrossDomain);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.post('/categories', customer.getCategories);
app.post('/customerrequest', customer.processrequest);
app.post('/initialRequest', customer.initialRequest);
app.post('/submitTicket', customer.submitTicket);
app.post('/knowledgeBase', customer.knowledgeBase);
app.post('/custPollReq', customer.custPollReq);





app.post('/clientPollReq',admin.clientPollReq);
app.post('/initialClientPollReq',admin.initialClientPollReq);
app.post('/insertkb',admin.insertkb);
app.get('/knowledgeDB',admin.knowledgeDB);
app.post('/inbox',admin.inbox);
//app.get('/unreadMessages',admin.unreadMessages);
//app.post('/adminChat',admin.adminChat);
app.post('/clientResp',admin.clientResp);
app.post('/adminvalidate', admin.adminvalidate);
app.get('/admin',admin.dashboard);
app.get('/logout',admin.logout);
app.get('/chat',admin.chat);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

