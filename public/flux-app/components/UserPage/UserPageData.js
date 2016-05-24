import React from 'react';

export default class UserPageData extends React.Component{
	render(){
		if(this.props.userData){
		const UI = this.props.userData;
	return( <div id="userInfo">
			<ul className="list-group">
			<li className="list-group-item">Name: {UI.username}</li>
			<li className="list-group-item">City: {UI.city}</li>
			<li className="list-group-item">Favorite music: {UI.music}</li>
			<li className="list-group-item">Message: </li>
			<li className="list-group-item">
				"{UI.message}"
			</li>
			</ul>
			</div> 
		);
	}

	if(!this.props.userData){
		return(
			<div id="userInfo">
			loading....
			</div>
			);
	}
	
	}
}