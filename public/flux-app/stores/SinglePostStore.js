import BounceDispatcher from '../dispatcher/BounceDispatcher.js';
import BounceConstants from '../constants/BounceConstants.js';

import assign from 'object-assign';
import {EventEmitter} from "events";
const CHANGE_EVENT = 'change';

const SinglePostState = {
    post:null
}

function PagePost(Data){
    SinglePostState.post = Data;
    SinglePostStore.emitChange();
}

const SinglePostStore = assign({}, EventEmitter.prototype,{
    emitChange() {
    this.emit(CHANGE_EVENT)
    },
    addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)   
    },
    getSinglePostState:function(){
        return SinglePostState
    }
});

export default SinglePostStore;

BounceDispatcher.register(function(action){
    let Data;
    switch(action.actionType) {

        case BounceConstants.SET_SINGLE_POST:
            Data = action.Data;
            if(Data !== null){
            PagePost(Data)
            }
            break;

        default:
    }
});