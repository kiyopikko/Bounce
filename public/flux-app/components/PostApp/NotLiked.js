import React from 'react';

export default class NotLiked extends React.Component{
    render(){
        let counter = this.props.counter.length; 
     return(
        <li className="likeButton" onClick={this.props.Like}>likes {counter}</li>
        );   
    }
}