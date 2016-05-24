import React      from 'react';
import  {Link}    from "react-router";
import SinglePost from "./SinglePost.js";

export default class Notice extends React.Component{
	render(){
			 const self = this; 
        	 let notification = self.props.notice;
        	 let actionUser   = notification.user;
			 let postUser     = notification.ImgUser;
			 let me           = self.props.me;
			 const postId	  = notification.postId || notification.postId;
			 const link       = "SinglePost/"+postId;
			 let ClassName;
			 
			 if(notification.seen){
			 	ClassName  = "SeenNotification";
			 } else {
			 	ClassName  = "UnseenNotification";
			 }
        	 if(notification.action === "like"){
        	 	return(<Link to={link} className={ClassName}><li className="list-group-item">{actionUser} liked your post</li></Link>);
        	 }
        	 if(notification.action === "comment"){
        	 	if(postUser === me){
        	 		return(<Link to={link} className={ClassName}><li className="list-group-item">{actionUser} commented on your post</li></Link>);
        	 	} else {
        	 		return(<Link to={link} className={ClassName}><li  className="list-group-item">{actionUser} commented on {postUser}'s post</li></Link>);
        	 	}
        	 }
		return(
			<div>No notifications</div>
			);
	}
}