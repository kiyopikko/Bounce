import ChatAppStore     from './ChatAppStore.js';
import BounceDispatcher from '../dispatcher/BounceDispatcher.js';
import BounceConstants  from '../constants/BounceConstants.js';
import assign           from 'object-assign';
import {EventEmitter}   from "events";
const CHANGE_EVENT = 'change';

const logInState = {
    _id:null,
    loggedIn:false,
    message:null,
    username:null,
    token:null
}

const setTokenToState = function(){
    if(localStorage.loggedIn === "true"){
        logInState.loggedIn = true;
        logInState.username = localStorage.username;
        logInState.token = localStorage.token;
//set userinfo to userinfo?
        ChatAppStore.setUserName(localStorage.username);
    }
}

function setStateFunction(Data){
    window.localStorage.clear();
    localStorage.loggedIn = true;
    localStorage.message = null;
    localStorage.username = Data.username;
    localStorage.token = Data.token;
    localStorage._id = Data._id;

    logInState.loggedIn = true;
    logInState.username = Data.username;
    logInState.message = null;
    logInState.token = Data.token;
    logInState._id = Data._id;

    ChatAppStore.setUserName(Data.username);
    LoginSignupLogoutStore.emitChange();
    return;
}

function loginAndStateError(Data){
    if(Data.errorMessage){
    
    localStorage.logInState = {
    loggedIn:false,
    message:Data.errorMessage,
    username:Data.username,
    token:Data.token
    };
    
    logInState.message = Data;
    LoginSignupLogoutStore.emitChange();

    setTimeout(function(){
     logInState.message = null;
     LoginSignupLogoutStore.emitChange();
    }, 4000);
    }
}
//////////////////////////////////////////////
//LOGIN 								    //
//////////////////////////////////////////////
function logIn(loginData){
        if(loginData.success === true){
            setStateFunction(loginData);
        }
        if(loginData.success === false){
            loginAndStateError(loginData);
        }
};
//////////////////////////////////////////////
//SIGN UP									//
//////////////////////////////////////////////
function signUp(signUpData){
       
        if(signUpData.success === true){
                setStateFunction(signUpData);
        }
        if(signUpData.success === false){
                loginAndStateError(signUpData);
        }
};

//////////////////////////////////////////////
//Log Out									//
//////////////////////////////////////////////

function logOut(LogOutData){
        localStorage.clear();
        logInState.loggedIn = false;
        logInState.username = null;
        logInState.message = null;
        logInState.token = null;
        logInState._id = null;
        //clear history of Link or set to home
        LoginSignupLogoutStore.emitChange();
       /* send something to backend to know?*/
};

const LoginSignupLogoutStore = assign({}, EventEmitter.prototype, {
	getLoginState:function(){
		return logInState;
	},
	emitChange: function() {
    this.emit(CHANGE_EVENT);
  	},
  	// this will run after you login to backend
  	addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  	},
  	removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  	},
    setToken: function(){
    setTokenToState();    
    }
});

export default LoginSignupLogoutStore;

BounceDispatcher.register(function(action) {
	let formData;

	switch(action.actionType) {
		case BounceConstants.LOG_IN:
			formData = action.formData;
			if(formData !== null){
			logIn(formData);
			}
			break; 
		
		case BounceConstants.SIGN_UP:
			formData = action.formData;
			if(formData !== null){
			signUp(formData);
			}
			break;

        case BounceConstants.LOG_OUT:
            formData = action.formData;
            if(formData !== null){
            logOut(formData);
            }
            break;

		default:
	}
});