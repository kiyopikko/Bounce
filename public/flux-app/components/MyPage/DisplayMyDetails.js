import React from 'react';

export default class DisplayUserInfo extends React.Component{
	render() {
		const UI = this.props.userinfo; 
		if({UI}){ 
		return(
			<ul className="list-group">
			<li className="list-group-item">Name: {UI.username}</li>
			<li className="list-group-item">City: {UI.city}</li>
			<li className="list-group-item">Favorite music:{UI.music}</li>
			<li className="list-group-item">Message: </li>
			<li className="list-group-item">"{UI.message}"</li>
			</ul> 
			);
		} 
		if(!{UI}){
			return(
				<h2>loading...</h2>
				);
		}
	}
}
