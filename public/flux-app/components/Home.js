import React from 'react';
import  {Link} from "react-router";

export default class Home extends React.Component{
    render(){
        return(
        <div id="Home">
        <h1>Post</h1>
        
        <Link to="PostApp"> 
        <img src="svg/people.svg"/>
        </Link>

        <h1>Chat</h1>
        
        <Link to="ChatApp">
        <img src="svg/shapes.svg" />
        </Link>

        </div>
            );
    }
}