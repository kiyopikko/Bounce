import BounceDispatcher from '../dispatcher/BounceDispatcher';
import BounceConstants  from '../constants/BounceConstants';
import socket           from '../socket.js';

export default { 
	showMoreChats:function(roomAndLimit){
		socket.emit('showMoreChats',roomAndLimit);
	},
	submitMessage:function(message){
			socket.emit('newMessage', message, function (err) {
            if (err)
                return console.error('New comment error:', err);
            	//maybe display err message in chat small tab?
            });
	},
	destroyRoom:function(myRoom){
		socket.emit('Delete_Room',myRoom);
        socket.emit('getRooms');
	},
	switchRoom: function(RoomAndUser){
		socket.emit('changeRooms', RoomAndUser);
	},
	createRoom: function(room){
		socket.emit('CreateRoom',room);
        socket.emit('getRooms');
	},
	showPosts:function(RoomAndUser){
		socket.emit('ShowDisountsGetOutOfRoom',RoomAndUser);
	},
	logout:function(socketuser){
		socket.emit('logout',socketuser);
	}
}