import React from 'react';
import ReactDOM from 'react-dom';

import CommentList from './CommentList.js';
import MessageForm from './MessageForm.js';

import ChatAppActions from '../../actions/ChatAppActions.js';

export default class ChatRoom extends React.Component{
    constructor(){
        super()
    }
    submitMessage (message) {
    ChatAppActions.submitMessage(message)
    }
    render() {
            return (    
            	<div>        	
                <CommentList 
                id          = "CommentList"
                windowWidth = {this.props.ChatAppState.windowWidth}
                username    = {this.props.ChatAppState.ChatAppState.user} 
                room        = {this.props.ChatAppState.ChatAppState.current_room} 
                comments    = {this.props.ChatAppState.ChatAppState.messages} 
                />

                {this.props.ChatAppState.ChatAppState.current_room ? 
                <MessageForm 
                id            = "CommentForm" 
                submitMessage = {this.submitMessage.bind(this)} 
                user          = {this.props.ChatAppState.ChatAppState.user} 
                room          = {this.props.ChatAppState.ChatAppState.current_room} 
                />:
                <div></div>}
                
                </div>
                );
        }
}