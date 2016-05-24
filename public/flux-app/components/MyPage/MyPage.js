import React from 'react'; 
import MyPageAppActions     from '../../actions/MyPageAppActions.js';  
import MyPageAppStore       from '../../stores/MyPageAppStore.js'; 
import DisplayUserInfo      from './DisplayMyDetails.js'; 
import EditUserInfo         from './EditMyDetails.js'; 
import Posts                from '../PostApp/Posts.js'; 

function getNavigationAppState (){ 
	return{  
	userInfoState:MyPageAppStore.getNavigationAppState()  
	} 
}; 

export default class UserInfo extends React.Component{ 
	constructor(){ 
		super() 
		this.editDetails      = this.editDetails.bind(this)
		this.setDeleteAccount =	this.setDeleteAccount.bind(this)
		this._updateUserInfo  = this._updateUserInfo.bind(this)
		this.state            = getNavigationAppState()
	}
	componentDidMount(){
		MyPageAppStore.addChangeListener(this._updateUserInfo)
		this.getMyPage()
	}
	componentWillUnmount(){
		MyPageAppStore.removeChangeListener(this._updateUserInfo)
	}
    editDetails(){
    	this.setState({edit:!this.state.edit})
    }
    setDeleteAccount(){
    	this.setState({delete:!this.state.delete})
    }
    deleteAccount(){
    	const username = this.props.LoginState.loggedIn.username;
    	MyPageAppActions.deleteUser(username)
    }
    _updateUserInfo(){
		this.setState(getNavigationAppState())
	}
	getMyPage(){
		const limit = this.state.userInfoState.limit;
		const username = this.props.LoginState.loggedIn.username;
		let query = {
			limit:limit,
			username:username
		}
		MyPageAppActions.getUserInfo(query)
	}
	showMorePosts(){
		MyPageAppStore.getMorePosts()
		this.getMyPage()
	}
	backToTop(){
		 window.scrollTo(0,0);
	}
	rereshMyPage(){
		MyPageAppStore.showLessPosts();
		window.scrollTo(0,0);
	}
	render(){
		const username = this.props.LoginState.loggedIn.username;
		const myPage = {myPage:true}
		return(
		<div id="myPage">
		
		{this.state.edit ?  
		<EditUserInfo editDetails={this.editDetails} 
		userinfo={this.state.userInfoState.userinfo} 
		saveUserInfo={this.saveUserInfo}/> 
		: 
		<DisplayUserInfo userinfo = {this.state.userInfoState.userinfo}/>} 

		{this.state.edit ? 
		<div>
		<button onClick = {this.editDetails} className="btn btn-info">Cancel</button> 

		{this.state.delete ? null : 
		<button className="btn btn-danger" onClick={this.setDeleteAccount}>Delete me</button>} 
		
		{this.state.delete ? 
		<div className="areYouSure"> 
		<h4>Are you sure? </h4> 
		<button onClick={this.deleteAccount.bind(this)} className="btn btn-danger">Yes</button> 
		<button onClick={this.setDeleteAccount} className="btn btn-warning">No</button> 
		</div> : null} 
		</div>
		: 
		<button onClick  = {this.editDetails} className="btn btn-success">Edit</button>}

		<Posts Posts={this.state.userInfoState.posts} user={username}/> 

		
		{this.state.userInfoState.posts[8] ?
		<div className="btn-group btn-group-justified" role="group" aria-label="...">
		  <div className="btn-group" role="group">
    	<button type="button" className="btn btn-default" onClick={this.showMorePosts}>More posts</button>
  		  </div>
  		<div className="btn-group" role="group">
    	<button type="button" className="btn btn-default" onClick={this.backToTop}>Top</button>
  		  </div>
  		<div className="btn-group" role="group">
    	<button type="button" className="btn btn-default" onClick={this.rereshMyPage}>Refresh</button>
  		</div>
		</div>
		: null
		}


		</div>		
			);
	}
}