import React from 'react';

import UserPageActions from '../../actions/UserPageActions.js';
import UserPageStore   from '../../stores/UserPageStore.js';
import UserPageData    from './UserPageData.js';
import Posts           from '../PostApp/Posts.js';

function getUserInfo(){
	return{
		userinfo:UserPageStore.getUserPageState()
	}
} 

export default class UserPage extends React.Component{
	constructor(){
		super()
		this.componentDidMount = this.componentDidMount.bind(this)
		this.setUserPageState  = this.setUserPageState.bind(this)
		this.state = getUserInfo()
	}
	componentDidMount(){
		UserPageStore.addChangeListener(this.setUserPageState)
		this.getUserInfo()
	}
	getUserInfo(){
		const username = this.props.params.user;
		const limit    = this.state.userinfo.limit;
		UserPageActions.requestUserPage({username:username,limit:limit})
	}
	
	componentWillUnmount(){
		UserPageStore.removeChangeListener(this.setUserPageState)
		UserPageStore.resetLimit()
	}
	
	setUserPageState(){
		this.setState(getUserInfo())
	}

	backToTop(){
		window.scrollTo(0,0);
		UserPageStore.resetLimit()
	}

	showMore(){
	UserPageStore.showMorePosts();
   	this.getUserInfo()
    }

    render(){
    	const user = this.props.LoginState.loggedIn.username;
    	let moreButtons = <div></div>;

    	if(this.state.userinfo.userinfo){
    	if(this.state.userinfo.posts){
    		if(this.state.userinfo.posts.length > 9){
    			let	moreButtons = <div>
			<button onClick={this.showMore.bind(this)}>Show more posts</button>
			<button onClick={this.backToTop}>Back to top</button>
			</div>;

    		}
    	}
    		return(
			<div id="UserPageDiv">

			<UserPageData userData={this.state.userinfo.userinfo}/>
			<Posts Posts={this.state.userinfo.posts} user={user}/>
				{moreButtons}
			</div>
			);	
    	}
    	return(
    		<div>loading</div>
    		);		
    }
}