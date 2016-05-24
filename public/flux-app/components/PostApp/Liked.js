import React from 'react';

export default class Liked extends React.Component{
    render(){
        let counter = this.props.counter.length;
       return(
        <li className="likeButton"onClick={this.props.Unlike}>likes {counter}</li>
        ); 
    }
}