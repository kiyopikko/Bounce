import React from 'react';

export default class ReplyText extends React.Component{
    render(){
        const comment = this.props.comment.comment;
        const user = this.props.comment.user;
        return(
            <li className="comment list-group-item">
            {user} said: {comment}
            </li>
            );
    }
}