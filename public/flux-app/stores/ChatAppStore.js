import LoginSignupLogoutStore from './LoginSignupLogoutStore.js';
import BounceDispatcher       from '../dispatcher/BounceDispatcher.js';
import BounceConstants        from '../constants/BounceConstants.js';
import socket                 from '../socket.js';
import assign                 from 'object-assign';
import {EventEmitter}         from "events";
const CHANGE_EVENT = 'change'; 

const chatAppState = {
            messages: [],
            user:null,
            rooms:null,
            current_room:null,
            UsersConnected:null,
            UsersInThisRoom:null,
            My_Room:null
            }

            /* probably dont need this anymore
            if(chatAppState.My_Room === null){ 
            socket.emit('Check_If_Have_Room', chatAppState.user);
            }*/

            ///////////////////////////////////////////////////////////////
            //                   SOCKET ON                               //                
            ///////////////////////////////////////////////////////////////

            socket.on('BroadcastUsers', function(UsersConnected){
                chatAppState.UsersConnected = UsersConnected;
                ChatAppStore.emitChange();
            });
            
            socket.on('getRooms', function (rooms){
            chatAppState.rooms = rooms;
            ChatAppStore.emitChange();
            });
            
            socket.on('myroom', function(My_Room){
                chatAppState.My_Room = My_Room;
                ChatAppStore.emitChange();
            });

            socket.on('changeRoomState', function(new_room){ 
                chatAppState.current_room = new_room;
                chatAppState.messages = [];
                ChatAppStore.emitChange();
            });

            socket.on('message', function (newmessage){
                chatAppState.messages.push(newmessage);
                ChatAppStore.emitChange();
            });

            socket.on('UsersInRoom', function(UsersInThisRoom){
                chatAppState.UsersInThisRoom = UsersInThisRoom;
                ChatAppStore.emitChange();
            });

            socket.on('ExitRoom', function(){
                chatAppState.current_room = null;
                ChatAppStore.emitChange();
            });

            socket.on('loadRoomMessages', function(messages){
                chatAppState.messages = messages;
                ChatAppStore.emitChange();
            }); 

            socket.on('roomRemoved', function(rooms){
                chatAppState.current_room = null;
                chatAppState.rooms = rooms;
                ChatAppStore.emitChange();
            });

            socket.on('leaveCurrentRoom', function(){
                chatAppState.current_room = null;
                ChatAppStore.emitChange();
            });

const ChatAppStore = assign({}, EventEmitter.prototype,{
	setUserName: function(username){
		chatAppState.user = username;
        socket.emit('BroadcastUser',username);
        if(chatAppState.My_Room === null){ 
            socket.emit('Check_If_Have_Room', username);
            }           
        this.emitChange();
	},
	getChatAppState:function(){
		return chatAppState
	},
    emitChange: function() {
    this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
    }
});

export default ChatAppStore;