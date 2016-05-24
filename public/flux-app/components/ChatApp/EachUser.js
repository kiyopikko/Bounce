import React from 'react';
import  {Link} from "react-router";

export default class EachUser extends React.Component{
    render(){
    	let link = "UserPage/"+this.props.user;
    	return( 
            <Link 
            to={link} 
            className = "userLink"> 
            <li className="list-group-item">
            {this.props.user}
            </li>
            </Link>
            );
    }
}