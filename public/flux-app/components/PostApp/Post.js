import React from 'react';
import  {Link} from "react-router"; 
 
import LikeHandler from './LikeHandler.js';
import MyPost from './MyPost.js';

export default class Post extends React.Component{
    render(){
        const PROPS         = this.props;
        const image         = PROPS.post.ImgDir;
        const user          = PROPS.post.user;
        const comment       = PROPS.post.comment;
        const likesAndUsers = PROPS.post.likesAndUsers;
        const me            = PROPS.user;
        const post          = PROPS.post;
        const postId        = PROPS.post._id;
        const link = "UserPage/"+user;
        if (me === user){
            return(
                <div className="Post">
                <img className="postImage" src={image} height="500" />
                <LikeHandler id={postId} me={me}className="likeHandler" likes={likesAndUsers} ImgDir={image}/>
                <MyPost post={post} user={me}/>
                </div>
                );
        }  
        return(
            <div className="Post">
            <img className="postImage" src={image} height="500"/>
            <LikeHandler id={postId} me={me} ImgUser={user} className="likeHandler" likes={likesAndUsers} ImgDir={image}/>
            <h3 className="CommentBox"> <Link className="userLink" to={link}>{user}</Link>  - {comment}</h3>
            </div>
            );
        }
}