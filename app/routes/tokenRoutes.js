var User       = require('../models/user');
var UserInfo   = require('../models/userinfo');
var Notice     = require('../models/notification.js');
var express    = require('express'); 
var apiRoutes  = express.Router();
var jwt        = require('jsonwebtoken');
var mongoose   = require('mongoose');

module.exports = function(app, passport){
	
	app.get('/', function(req, res){
		res.render('index.html');
	});

	apiRoutes.post('/login',function(req,res,next){
		 passport.authenticate('local-login', function(error, user, info) {
        if(error) {
            return res.send(info);
        }
        if(!user) {
            return res.send(info);
        }
        var token = jwt.sign(user, app.get('superSecret'), {expiresIn: '1hr'});
          
          res.json({
          _id:user._id,
          username:user.local.username,
          success: true,
          message: 'Enjoy your token!',
          token: token
          });
          
    })(req, res, next);
	});

	apiRoutes.post('/signup', function(req, res, next) { 
	passport.authenticate('local-signup', function(error, user, info) { 
        if(error) {
            return res.send(info);
        }
        if(!user) {
            return res.send(info);
        }

        var token = jwt.sign(user, app.get('superSecret'), {
        expiresIn: '1hr'});
        
        res.json({
          _id:user._id,
          username:user.local.username,
          success: true,
          message: 'Enjoy your token!',
          token: token
        });

        var notice = new Notice({username:user.local.username,notifications:[]});
        notice.save(function(err,data){
          if(err) throw err;
          console.log(data);
        });

        var infoDefault = {
          username:user.local.username,
          city:"City",
          music:"Music",
          message: "A message for people to see."
        }        
        var userinfo = new UserInfo(infoDefault);
        userinfo.save(function(err,data){
          if(err) throw err;
          console.log(data);
        });
    })(req, res, next);

	});

	app.get('/logout', function(req, res){
		//NOTHING HERE?
	}); 

	apiRoutes.use(function(req, res, next) { 
  	var token = req.body.token || req.query.token || req.headers['x-access-token'];
  	if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else { 
        req.decoded = decoded;    
        next();
      }
    });
  	} else { 
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  	}
	});

	apiRoutes.post('/UserName',function (req,res){  
		res.send({success:true});
	});
	
  apiRoutes.delete('/deleteUser',function (req,res){   
    var user     = {_id:req.body._id};
    var username = req.body.username;
    UserInfo.remove(username,function(err){
      if (err) throw err;
    });
    User.remove(user,function (err) {  
      if(err) throw err;
      res.send('deleted user');
    })
  });

	app.use('/api',apiRoutes);
};