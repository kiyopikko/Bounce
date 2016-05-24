import React from 'react';
import PostLoader from './PostLoader.js';
import PhotoLoader from './PhotoLoader.js';

export default class PostAppComponent extends React.Component{
    render(){
    	const user = this.props.LoginState.loggedIn.username;
        return(
        <div id="PostPage">
        <PhotoLoader user={user}/>
      	<PostLoader user={user}/>
        </div>);
    } 
}