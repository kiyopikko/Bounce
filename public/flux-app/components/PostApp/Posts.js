import React from 'react';
import Post from  './Post.js';
import ReplyComment from './ReplyComment.js';
import PostsReplies from './PostsReplies.js';
import RepliesAppStore from '../../stores/RepliesAppStore.js';
import RepliesAppActions from '../../actions/RepliesAppActions.js'; 

//create replies action

function getReplies(){
    return{
        replies:RepliesAppStore.getReplies()
    } 
}

export default class Posts extends React.Component{
    constructor(){
        super()
        this._updateReplies = this._updateReplies.bind(this)
        this.state = getReplies()
    }
    componentDidMount(){
    RepliesAppStore.addChangeListener(this._updateReplies);
    RepliesAppActions.getReplies(); 
    }
    componentWillUnmount() {
    RepliesAppStore.removeChangeListener(this._updateReplies);
    }  
    _updateReplies(){
        this.setState(getReplies())
    } 
    render(){
        const self = this; 
        let comments = []; 
        let SinglePost;
        if(this.props.Posts != null || undefined){
            
            let SinglePost = this.props.SinglePost || "notSinglePost";

            const ShowAllPosts = this.props.Posts.map( function(post){
                comments = [];
                self.state.replies.map(function(comment){
                    if(comment.ImgDir === post.ImgDir){
                        comments.push(comment);
                    }
                }); 
                return( <div key={post._id}>   
                    <Post post={post} user={self.props.user} /> 
                    <ReplyComment comments={comments} postId={post._id} user={self.props.user} ImgDir={post.ImgDir} ImgUser={post.user}/> 
                    <PostsReplies ImgDir={post.ImgDir} comments={comments}/> 
                    </div>);
                comments = [];
            });

             return(
                <div className={SinglePost}>
                {ShowAllPosts}
                </div>
                );
            }

            return(
                <div></div>
                );
    }
}