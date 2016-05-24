import BounceDispatcher from '../dispatcher/BounceDispatcher.js';
import BounceConstants from '../constants/BounceConstants.js';

import assign from 'object-assign';
import {EventEmitter} from "events"; 
const CHANGE_EVENT = 'change';

const NotificationState = {
	Notifications:null,
    limit:10
} 

function Notification(Data){
	NotificationState.Notifications = Data;
	NotificationStore.emitChange();
}

const NotificationStore = assign({}, EventEmitter.prototype,{ 
    emitChange() {
    this.emit(CHANGE_EVENT)
    },
    addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)   
    },
    getNotificationAppState:function(){
        return NotificationState
    },
    showMoreNotifications:function(){
        NotificationState.limit += 10;
        this.emitChange();
    },
    restartNotificationLimit:function(){
        NotificationState.limit = 10;
        this.emitChange();
    }
});

export default NotificationStore;

BounceDispatcher.register(function(action){
    let Data;
    switch(action.actionType) {

        case BounceConstants.GET_USER_NOTIFICATIONS:
            Data = action.Data;
            if(Data !== null){
            Notification(Data)
            }
            break;

        default:
    }
});