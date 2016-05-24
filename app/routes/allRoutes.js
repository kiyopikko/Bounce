var passport  = require('passport'); 
var mongoose  = require('mongoose');
var multer    = require('multer');
var fs        = require('fs');

var Schema    = mongoose.Schema;
var Posts     = require('../models/posts');
var Replies   = require('../models/Replies');
var UserInfo  = require('../models/userinfo');
var Notice    = require('../models/notification');
var ImagePost = mongoose.model('Posts');
var ReplyPost = mongoose.model('Replies'); 

var fileDir;
if(process.env.OPENSHIFT_DATA_DIR){
	fileDir = process.env.OPENSHIFT_DATA_DIR;
} else {
	fileDir = './public/images';
} 

var storage   = multer.diskStorage({
  destination: function (req, file, callback){
    callback(null, fileDir);
  },
  filename: function (req, file, callback){
   var timeNow = Date.now();
  	callback(null, timeNow+file.originalname);
  }
});

var upload     = multer({ storage : storage}).single('userPhoto');

module.exports = function(app){

app.post('/imageUpload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        var savepostInfo = {
        	comment:req.body.comment,
        	user:req.body.user,
        	ImgDir:req.file.filename
        }
        SavePost(savepostInfo);
       res.send(savepostInfo);
    });
});

var SavePost = function(PostData){
		console.log(PostData)
		 var imagepost = new ImagePost(PostData);
		 imagepost.save(function(err, doc){
			saveNotification({user:doc.user,postId:doc._id});
		});
};

app.get('/LatestImages/:length/:latest/:oldest/:limit',function(req,res){
	//may need more sorting later?	
	var args = req.params;
	ImagePost.find({}).sort({created:-1}).limit(args.limit).exec(function(err, docs){
	if(err) throw err;
	var responseDocs = {docs,args}
	res.send(responseDocs);
	});
});

app.get('/GetRepliesToPost', function (req,res){
	
	ReplyPost.find({}).sort({created:-1}).limit(100).exec(function(err,docs){
	if(err) throw err;
 	res.send(docs);
	});

});	

app.delete('/deletePost', function (req,res){
	const postId   = {_id:req.body._id};
	const ImgDir   = req.body.ImgDir;
	var filePath;

	if(process.env.OPENSHIFT_DATA_DIR){
		filePath = process.env.OPENSHIFT_DATA_DIR+ImgDir;
	} 
	if(!process.env.OPENSHIFT_DATA_DIR){
		filePath = "./public/images/"+ImgDir;
	}

	fs.unlinkSync(filePath);

	ImagePost.remove(postId, function(err){
    if(err) throw err;
	});

	ReplyPost.remove({postId:postId},function(err){
		if(err) throw err;
		res.send(200);
	});
});

app.put('/editPost', function (req, res) {
	var query  = {_id:req.body._id};
	var update = {comment:req.body.comment};
	
	ImagePost.findOneAndUpdate(query,update,function(err,data){
		if(err) {
        return res.status(500).json({'error' : 'error in updating user information'});
        }
        res.json(data);
		});
});

////////////////////////////////////////////////////////////
// POST REPLY //////////////////////////////////////////////
//////////////////////////////////////////////////////////// 

app.post('/ReplyToPost', function(req,res){
	var post                = req.body;
	var replypost           = new ReplyPost(post);
	var notificationData    = req.body;
	notificationData.action = "comment";
 	replypost.save(function(err,docs){
		if(err) throw err;         
		res.send('hi');
		saveNotification(notificationData);
	});
});

app.put('/AjaxLiker', function(req,res){
	var ImgDir              = req.body.ImgDir;
	var user                = req.body.user;	
	var notificationData    = req.body;
	notificationData.action = "like";
		ImagePost.findOneAndUpdate({ImgDir:ImgDir},{$push:{likesAndUsers:{user:user}}},function(err,data){
		if(err) {
        return res.status(500).json({'error' : 'error in deleting like'});
        }
        res.json(data);
        saveNotification(notificationData);
		});
});

app.put('/AjaxUnLiker', function(req,res){
	var ImgDir              = req.body.ImgDir;
	var user                = req.body.user;	
	var notificationData    = req.body;
	notificationData.action = "unlike";
		ImagePost.findOneAndUpdate({ImgDir:ImgDir},{$pull:{likesAndUsers:{user:user}}},function(err,data){
		if(err) {
        return res.status(500).json({'error' : 'error in deleting like'});
        }
        saveNotification(notificationData);
        res.json(data);
		});
});

///////////////////////////////////////////////////////////
//				NOTIFICATION HANDLER                     //
///////////////////////////////////////////////////////////
var saveNotification = function(data){
	var d        = new Date();
	var n        = d.getTime();
	data.created = n;
	data.seen    = false;

	if(data.action === "like"){
		if(data.ImgUser === data.user){
			return false;
		}
		console.log("Sent like notification to " + data.ImgUser)
		
		Notice.findOneAndUpdate({username:data.ImgUser},{$push:{notifications:data}},function(err,NotificationDocs){
			if(err) throw err;
			console.log(NotificationDocs, " got a like on his/her post")
			//emit to the one user only 
		});
	}
	if(data.action === "comment"){
		var users = data.usersInComments;
		var i;

			//adds image user to user array if not there 
			if(users.indexOf(data.ImgUser) === -1){
				users.push(data.ImgUser)
				console.log("added image user",data.ImgUser)
			}
			// adds user to array if not there
			if(users.indexOf(data.user) === -1){
				users.push(data.user)
				console.log("added the guy who commented",data.user)
			}
		
		console.log(users)
		for(i=0; i < users.length; i++){

			if(users[i] === data.user){
				console.log("skip this guy " + users[i])
				continue;
			}

		Notice.findOneAndUpdate({username:users[i]},{$push:{notifications:data}},function(err,NotificationDocs){
		if(err) throw err;
		console.log("Sent notification to " + NotificationDocs.username)
		});
		//emitNotification({data:data,users:users})
		}
	}
	if(data.action === "unlike"){
		Notice.findOneAndUpdate({username:data.ImgUser},{$pull:{notifications:{notification:data}}},function(err,NotificationDocs){
			console.log("removed notification from " + data.ImgUser)
		});
	}
}
 

app.get('/GetUserPosts/:username/:limit',function(req,res){ 
	var username = req.params.username; 
	var limit 	 = req.params.limit;
	console.log(req.params)
	ImagePost.find({user:username}).sort({created:-1}).limit(limit).exec(function(err,data){  
		if(err){
			return res.status.json({'err':'error in deleting like'});
		}
		res.json(data)
	}); 
}); 

app.get('/getNotifications/:username/:limit',function(req,res){
	var username = req.params.username;
	var limit    = req.params.limit; 

	Notice.find({username:username}).sort({created:-1}).limit(limit).exec(function(err, data){
		if(err) throw err;
		if(data === null){
			res.send({response:null});
		}
		res.json(data);
	});
});


app.get('/GetUserInfo/:username', function (req,res){
 	var username = req.query.username;
 	UserInfo.findOne({username:username},function(err,data){
 		if(err) {
 			return res.send('data error');
 		}
 		return res.json(data);
 	});
}); 

app.post('/saveUserInfo',function(req,res){
	var info     = req.body; 
	var userInfo = new UserInfo(info);
	UserInfo.save(function(err,data){
		if(err) throw err;
		res.send('done saved data');
	});
});

app.put('/changeUserInfo',function(req,res){
	var query  = {"_id": req.body._id};
	var update = {city:req.body.city,music:req.body.music,message:req.body.message};
	UserInfo.findOneAndUpdate(query,update,function(err,data){
		if(err) {
        return res.status(500).json({'error' : 'error in updating user information'});
        }
        res.send(200);
		});
});
  
app.get('/userpage/:username',function(req,res){
	const username = req.query.username; 
	UserInfo.findOne({username:username},function(err,data){
 		if(err) {
 			return res.send('data error');
 		}
 		return res.json(data);
 	});
});

app.get('/usersposts/:username/:limit',function(req,res){
	var username = req.params.username; 
	var limit    = req.params.limit;
	ImagePost.find({user:username}).sort({created:-1}).limit(limit).exec(function(err,data){
 		if(err) {
 			return res.send('data error');
 		} 
 		return res.json(data);
 	});
});

app.get("/getSinglePost/:postId/:username",function(req,res){
 	const postId   = req.params.postId;
 	const username = req.params.username;
 	ImagePost.findOne({_id:postId},function(err,data){
 		if(err) {
 			return res.send('data error');
 		}

 		Notice.find({username:username,"notifications.postId":postId},function(err,docs){
 			var originalDoc;
 			var docsArray = docs[0].notifications;
 			var dosLength = docs.length
 			var i;
 			for(i = 0; i < docs[0].notifications.length; i++){
 				if(docs[0].notifications[i].seen === false){
 					if(docs[0].notifications[i].postId === postId){
 						originalDoc = docs[0].notifications[i]
 						Notice.update({username:username,"notifications.created":originalDoc.created},{$set:{"notifications.$.seen":true}},function(err,docs){
 							console.log("updated")
 						});
 					}
 				}
 			}
 		});
 		return res.json(data);
 	});
});
}