import React from 'react';
import ReplyText from './ReplyText';

export default class PostsReplies extends React.Component{
    constructor(){
        super()
        this.showReplies = this.showReplies.bind(this)
        this.state = {
            showReplies:false
        }
    }
    showReplies(e){
        e.preventDefault();
        this.setState({showReplies:!this.state.showReplies});
    }
    render(){
        let comments = this.props.comments; 
            if(comments){
                const commentsLength   = comments.length;
                const ShowEachComment  = comments.map( function(comment){
                return( <div className = "replyText" key={comment._id}> 
                    <ReplyText comment = {comment}/> 
                    </div>);
                });
                    return(
                    <div className = "postReplyDiv">
                     <h4 className = "commentsList" onClick={this.showReplies.bind(this)}> <u>{commentsLength} Comments </u></h4>
                     {this.state.showReplies ? 
                        <div className="repliesList">
                        {ShowEachComment} 
                        </div>
                        : null }
                    </div>
                    );
            }

            if(!comments){
               return(
                    <div>
                    No Comments                        
                    </div>
                  );
                }
            }
}