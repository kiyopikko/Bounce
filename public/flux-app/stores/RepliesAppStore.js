import BounceDispatcher from '../dispatcher/BounceDispatcher.js';
import BounceConstants from '../constants/BounceConstants.js';
import RepliesAppActions from '../actions/RepliesAppActions.js';
import assign from 'object-assign';
import {EventEmitter} from "events";
const CHANGE_EVENT = 'change';

//create a constructor put replies there

let Replies = [];

const getReplies = function(replies){
        Replies = replies;
        RepliesAppStore.emitChange();
}

const RepliesAppStore = assign({}, EventEmitter.prototype,{
    emitChange: function() {
    this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);    
    },
    getReplies:function(Data){
        return Replies;
    }
});

export default RepliesAppStore;

BounceDispatcher.register(function(action){
    let Data;
    switch(action.actionType) {

        case BounceConstants.GET_REPLIES:
            Data = action.Data;
            if(Data !== null){
        	getReplies(Data);
            }
            break;
        
        default:
    }
});