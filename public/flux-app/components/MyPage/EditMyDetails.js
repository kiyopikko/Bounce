import React from 'react';
import MyPageAppActions from '../../actions/MyPageAppActions.js';

export default class EditUserInfo extends React.Component{
	constructor(){
		super()
		this.setStateInfo = this.setStateInfo.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
		this.state = {}
	}
	componentDidMount(){
		this.setState({
			city:this.props.userinfo.city,
			music:this.props.userinfo.music,
			message:this.props.userinfo.message
		})
	}
	saveUserinfo(){ 
		const UI = this.props.userinfo;
		const STATE = this.state;
		const Data = {
			_id:UI._id,
			city:STATE.city || UI.city,
			music:STATE.music || UI.music,
			message:STATE.message || UI.message
		}
		MyPageAppActions.editUser(Data);
		this.props.editDetails();
	}
	setStateInfo(e){
		const _key = e.target.getAttribute("name");
		const _value = e.target.value;
		if(_key === "city"){
			this.setState({city:_value});
		}
		if(_key === "music"){
			this.setState({music:_value});
		}
		if(_key === "message"){
			this.setState({message:_value});
		}
	}
	render () { 
		return(
		<ul className="list-group"> 
		<li className="list-group-item">Name: {this.props.userinfo.username}</li> 
		<li className="list-group-item">City : <input  maxLength="15" onChange={this.setStateInfo.bind(this)} value={this.state.city} name="city" ref="city"/></li> 
		<li className="list-group-item">Music : <input  maxLength="15" onChange={this.setStateInfo.bind(this)} value={this.state.music} name="music"ref="music" /></li>
		<li className="list-group-item">Message : </li>
		<textarea 
        maxLength="100" 
        className="form-control" 
        ref="message" 
        onChange={this.setStateInfo} 
        value={this.state.message} 
        name="message">
        </textarea>
	    <button  className="btn btn-success" onClick={this.saveUserinfo.bind(this)}> Save </button>  
		</ul> 
			);
	}
}