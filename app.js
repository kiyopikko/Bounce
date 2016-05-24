var express     = require('express');
var app         = require('express')();

var config      = require('./app/config/config.js');
var server      = require('http').Server(app);
var io          = require('socket.io')(server);

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var morgan       = require('morgan');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');

var mongoose     = require('mongoose');
var configDB     = require('./app/config/database.js');
var configsecret = require('./app/config/secret.js'); 

var passport     = require('passport');
var jwt          = require('jsonwebtoken');

app.use(express.static(__dirname + '/public'));

if(process.env.OPENSHIFT_DATA_DIR){
	app.use(express.static(process.env.OPENSHIFT_DATA_DIR));
} else {
	app.use(express.static(__dirname + '/public/images'));	
}

app.use(morgan('dev'));
//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret:'Mgtow',
	saveUninitialized: true,
	resave: true
}));

app.set('view engine', 'html');
app.set('superSecret', configsecret.secret);
app.use(passport.initialize());
app.use(passport.session());
require('./app/config/passport')(passport);
mongoose.connect(configDB.url,function(){
	console.log(configDB.url);
});

//make this work!!!!////////////////////////////
/*
io.use(function (socket, next) {
  var userToken = socket.handshake.query.token;
  if(userToken === 'undefined'){
  	console.log("error dont connect");
  	return false;
  } else {
  	next();
  }
});
*/

require('./app/routes/tokenRoutes.js')(app, passport);
require('./app/routes/allRoutes.js')(app);
require('./app/socket/chat.js')(io);

server.listen(config.serverport, config.serverip, function() {
  console.log("Running @ http://" + config.serverip + ":" + config.serverport);
  //console.log(`Application worker ${process.pid} started...`);
});