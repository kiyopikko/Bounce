import BounceDispatcher         from '../dispatcher/BounceDispatcher.js';
import BounceConstants          from '../constants/BounceConstants.js';
import LoginSignupLogoutActions from '../actions/LoginSignupLogoutActions.js';

import assign from 'object-assign';
import {EventEmitter} from "events";
const CHANGE_EVENT = 'change';
 
const NavigationAppState = { 
	edit:null,
	userinfo:{ 
	_id:null,
	username:null,
	city:null,
	music:null,
	message:null 
	},
	posts:[],
	limit:10	
} 

const getUserPosts = function(Data){
	NavigationAppState.posts = Data;
	NavigationAppStore.emitChange();
}

const getUserinfo = function (Data) {
	NavigationAppState.userinfo = Data;
    NavigationAppStore.emitChange();
}

const editUser = function(Data) {
	NavigationAppState.userinfo = Data;
	NavigationAppState.userinfo.username = localStorage.username;
	NavigationAppStore.emitChange();
}

const NavigationAppStore = assign({}, EventEmitter.prototype,{ 
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},
	getNavigationAppState: function(){
		return NavigationAppState
	},
	getMorePosts:function(){
		NavigationAppState.limit += 10;
		this.emitChange()
	},
	showLessPosts:function(){
		NavigationAppState.limit = 10;
		this.emitChange()
	}
});

export default NavigationAppStore;

BounceDispatcher.register(function(action){
	let Data;
	switch(action.actionType) {

		case BounceConstants.EDIT_USER:
		Data = action.Data;
		if(Data !== null){
			editUser(Data);
		}
		break

		case BounceConstants.GET_USER_INFO:
		Data = action.Data;
		if(Data !== null){  
			getUserinfo(Data);
		}
		break

		case BounceConstants.GET_USER_POSTS:
		Data = action.Data;
		if(Data !== null){
			getUserPosts(Data);
		}
		break

		default:
	}
});