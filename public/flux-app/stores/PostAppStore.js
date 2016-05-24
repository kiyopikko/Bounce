import BounceDispatcher from '../dispatcher/BounceDispatcher.js';
import BounceConstants from '../constants/BounceConstants.js';

import assign from 'object-assign';
import {EventEmitter} from "events";
const CHANGE_EVENT = 'change';

const PostAppState = {
    posts:null,
    postsLength:null,
    latestPost:null,
    oldestPost:null,
    limit:10
}

const getPosts = function(Data){

        var postsLength,latestPost,oldestPost;

        if(Data.args){

        postsLength = Data.docs.length;
        latestPost  = Data.docs[0];
        oldestPost  = Data.docs[postsLength-1];
        PostAppState.posts       = Data.docs;
        }

        if(!Data.args){
        postsLength = Data.length;
        latestPost  = Data[0];
        oldestPost  = Data[postsLength-1]; 
        PostAppState.posts       = Data;
        }

        PostAppState.postsLength = postsLength;
        PostAppState.latestPost  = latestPost;
        PostAppState.oldestPost  = oldestPost;
        PostAppStore.emitChange();                   
}

const PostAppStore = assign({}, EventEmitter.prototype,{
    emitChange: function() {
    this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);    
    },
    getPostAppState:function(){
        return PostAppState
    },
    showMorePosts:function(){
        console.log("SHOW ME MORE!")
        PostAppState.limit += 10;
        this.emitChange();
    },
    showLessPosts:function(){
        PostAppState.limit = 10;
        this.emitChange();
    }
});

export default PostAppStore;

BounceDispatcher.register(function(action){
    let Data;
    switch(action.actionType) {

        case BounceConstants.GET_POSTS:
            Data = action.Data;
            if(Data !== null){
            getPosts(Data);
            }
            break;
        
        default:
    }
});