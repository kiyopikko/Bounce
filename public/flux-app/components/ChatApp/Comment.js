import React from 'react';

export default class Comment extends React.Component{
    render() {
        const me          = this.props.user;
        const commentUser = this.props.comment.user;
        let ClassNameSwitcher;
        let commentSwitcher;
        if( commentUser === me){
            ClassNameSwitcher = "myUsername";
            commentSwitcher   = "myComment"
        } else {
            ClassNameSwitcher = "otherMessage";
            commentSwitcher   = "comment";
        }
        return (
            <li className     = "list-group-item">
                <div className = {ClassNameSwitcher} >{this.props.comment.user} :</div><br/>
                <div className = {commentSwitcher}>{this.props.comment.message}</div>
            </li>
        );
    }
}