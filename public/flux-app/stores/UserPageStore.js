import BounceDispatcher from '../dispatcher/BounceDispatcher.js';
import BounceConstants from '../constants/BounceConstants.js';

import assign from 'object-assign';
import {EventEmitter} from "events";
const CHANGE_EVENT = 'change';

const UserPageState = {
	userinfo:null,
    posts:null,
    limit:10
}

function PageData(Data){
	UserPageState.userinfo = Data;
	UserPageStore.emitChange();
}

function PagePosts(Data){
    UserPageState.posts = Data;
    UserPageStore.emitChange();
}

const UserPageStore = assign({}, EventEmitter.prototype,{
    emitChange() {
    this.emit(CHANGE_EVENT)
    },
    addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
    },
    removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)   
    },
    showMorePosts(){
        UserPageState.limit +=10;
        this.emitChange()
    },
    resetLimit(){
        UserPageState.limit = 10;
        this.emitChange()
    },
    getUserPageState:function(){
        return UserPageState
    }
});

export default UserPageStore;

BounceDispatcher.register(function(action){
    let Data;
    switch(action.actionType) {

        case BounceConstants.SET_USER_PAGE_INFO:
            Data = action.Data;
            if(Data !== null){
            PageData(Data)
            }
            break;

        case BounceConstants.GET_USER_PAGE_POSTS:
            Data = action.Data;
            if(Data !== null){
            PagePosts(Data);
            }
        break

        default:
    }
});