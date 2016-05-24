var Chat       = require('../models/chat');
var Room 	   = require('../models/room');

module.exports = function(io){

io.on('connection', function (socket){
	var socketUser = null; 
	var that       = this;
	var UsersInCurrent_Room;
	var usersOnline;
 
	socket.on('BroadcastUser',function(SocketUser){
			socket.name = SocketUser;
			usersOnline = [];
			
			for(var i =0; i < io.sockets.sockets.length; i++){
			//skip null users
			if(io.sockets.sockets[i].name === undefined || null){
				continue;
			}
			usersOnline.push(io.sockets.sockets[i].name);
			}
			//only emit to non null people ffs
			io.sockets.emit('BroadcastUsers',usersOnline);
			usersOnline = [];
	});

	var getRoomsFromDb = function(){
		Room.find({},function(err,docs){
				socket.emit('getRooms',docs);	
		});	
	}
	getRoomsFromDb();

	socket.on('getRooms',function(){
		Room.find({},function(err,docs){
				io.sockets.emit('getRooms',docs);	
		});	
	});

	socket.on('changeRooms', function (RoomAndUser){
		var UsersInThisRoom = [];
		var user            = RoomAndUser.user;
		var newRoom         = RoomAndUser.room;
		var RoomSockets     = io.sockets.in(newRoom).sockets;
		var ExitedRoom      = socket.room;
		//broadcsat user left the room
		if(socket.room){
			for(var i=0; i <RoomSockets.length; i++){
				if(RoomSockets[i].room === ExitedRoom){
					UsersInThisRoom.push(RoomSockets[i].name);
				}
			}
		}
		//MAKE DRY 
		for(var i =0; i< UsersInThisRoom.length; i++){
			if(UsersInThisRoom[i] === user){
				UsersInThisRoom.splice([i],1);
			}
		}
		io.sockets.in(ExitedRoom).emit('UsersInRoom',UsersInThisRoom);
		UsersInThisRoom = [];
		socket.leave(socket.room);
		socket.room     = newRoom;
		socket.join(newRoom);
		socket.emit('changeRoomState', newRoom); 
		getMessages(socket, newRoom);	
		for(var i=0; i <RoomSockets.length; i++){
		if(RoomSockets[i].room === newRoom){
			UsersInThisRoom.push(RoomSockets[i].name);
		}
		}
		io.sockets.in(newRoom).emit('UsersInRoom',UsersInThisRoom);
		UsersInThisRoom = [];
	});

	//HANDLE NEW MESSAGES
	var SavedMessages = function(message){
		
		var saver = {
			room: socket.room,
			message: message.message,
			user: message.user
		};
		 var chat = new Chat(saver);
		 chat.save(function(err, doc){
		 });
	};

	//Get 50 messages in room 

	var getMessages = function(socket, current_room){
		Chat.find({'room':current_room}).sort({created:1}).limit(30).exec(function(err, messages){
		var user, message;
        var newMessage;
        var messagesArray  = [];
            for(var i =0; i< messages.length; i++){
                user       = messages[i].user;
                message    = messages[i].message;
                newMessage = {user:user,message:message};
                messagesArray.push(newMessage);
            };   
        	socket.emit('loadRoomMessages',messagesArray);
		});
	}

	socket.on('CreateRoom', function(NewRoom){
		var room = new Room(NewRoom);
		room.save(function(err,docs){
			Room.find({},function(err,docs){
				socket.emit('getRooms',docs);	
				socket.emit('myroom', NewRoom);	
			});	
		});	
	});

	socket.on('Check_If_Have_Room',function(My_Username){
		Room.find({},function(err,docs){
			for(var i=0; i<docs.length; i++){
			if(docs[i].host === My_Username){
				var My_Room = docs[i];
				socket.emit('myroom',My_Room);
				}
			}
		});
	});

	socket.on('Delete_Room', function(My_Room){
		Room.remove(My_Room,function(err,docs){
			Room.find({},function(err,docs){
				socket.emit('getRooms',docs);
				io.sockets.emit('roomRemoved',docs);
				Chat.remove({room:My_Room.room},function(err,roomchats){
					console.log(roomchats,"removed");
				})
			});
		});
	});
	
	socket.on('logout', function(socketname){
			usersOnline = [];		
			for(var i =0; i < io.sockets.sockets.length; i++){
			usersOnline.push(io.sockets.sockets[i].name);
			}
			for(var j = 0; j<usersOnline.length; j++){
				if(usersOnline[j] === socketname){
					usersOnline.splice([j],1);
				}
			}
			io.sockets.emit('BroadcastUsers',usersOnline);
			usersOnline = [];
			if(socket.room){
				var UsersInThisRoom = [];
				var ExitedRoom = socket.room;
				socket.leave(socket.room);
				socket.room = null;
				var RoomSockets     = io.sockets.in(ExitedRoom).sockets;
				for(var i=0; i <RoomSockets.length; i++){
				if(RoomSockets[i].room === ExitedRoom){
					UsersInThisRoom.push(RoomSockets[i].name);
					}
				}
				for(var i =0; i< UsersInThisRoom.length; i++){
				if(UsersInThisRoom[i] === socketname){
					UsersInThisRoom.splice([i],1);
					}
				}			
				io.sockets.in(ExitedRoom).emit('UsersInRoom',UsersInThisRoom);
				UsersInThisRoom = [];
			}
	});
	
	socket.on('ExitRoom', function(me){
		socket.leave(socket.room);
		socket.room = null;
		for(var i=0; i< usersOnline.length; i++){
			if(usersOnline[i] === me){
				usersOnline.splice([i],1);
			}
		};
		io.sockets.emit('BroadcastUsers', usersOnline);
	});

	socket.on('newMessage', function (message, callback) {
    	io.sockets.in(socket.room).emit('message',message);
    	SavedMessages(message);
	});

	socket.on('ShowDisountsGetOutOfRoom', function(RoomAndUser){
		socket.emit('leaveCurrentRoom');
		var UsersInThisRoom = [];
		var room            = RoomAndUser.room;
		var user            = RoomAndUser.me;
		socket.leave(socket.room);
		socket.room = null; 
		var RoomSockets     = io.sockets.in(room).sockets;
		for(var i=0; i <RoomSockets.length; i++){
				if(RoomSockets[i].room === room){
					UsersInThisRoom.push(RoomSockets[i].name);
				}
			}
		io.sockets.in(room).emit('UsersInRoom',UsersInThisRoom);		
	});

	socket.on('showMoreChats',function(roomAndLimit){
		Chat.find({'room':roomAndLimit.room}).sort({created:1}).limit(roomAndLimit.limit).exec(function(err, messages){
		var user, message;
        var newMessage;
        var messagesArray  = [];
            for(var i =0; i< messages.length; i++){
                user       = messages[i].user;
                message    = messages[i].message;
                newMessage = {user:user,message:message};
                messagesArray.push(newMessage);
            };   
        	socket.emit('loadRoomMessages',messagesArray);
		});
	});
	/*
	emitNotification = function(notificationData){
		var i;
		var users = notificationData.users; 
		var data = notificationData.data;
		console.log(users);	
		for(i=0; i < users.length; i=i+1){
			//omiit sending to myself
			if(users[i] === data.user){
				console.log("skip this guy " + users[i])
				continue;
			}
			socket.emit(users[i],data);
			console.log(users[i] + " got a notification update")
		}
	}*/

	socket.on('disconnect',function(){
		console.log("disconnected");
	});		
});
}