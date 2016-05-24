import React from 'react';
import SinglePostActions from '../../actions/SinglePostActions.js';
import SinglePostStore   from '../../stores/SinglePostStore.js';
import Posts             from '../PostApp/Posts.js';

function getSinglePost(){
	return{
		SinglePost:SinglePostStore.getSinglePostState()
	}
}

export default class SinglePost extends React.Component{
	constructor(){
		super() 
		this._getPost = this._getPost.bind(this)
		this.state = getSinglePost()
	}
	componentDidMount(){
		this.getPost()
		SinglePostStore.addChangeListener(this._getPost)
	}
	componentWillUnmount(){
		SinglePostStore.removeChangeListener(this._getPost)
	}
	componentWillReceiveProps(){
		this.getPost()
	}
	getPost(){
		const me = this.props.LoginState.loggedIn.username;
		const postId = this.props.params.postId; 
		if(postId){
			SinglePostActions.getSinglePost({postId:postId,username:me})
		}
	}
	_getPost(){
    this.setState(getSinglePost());
    }
	render(){
		const me = this.props.LoginState.loggedIn.username;
		if(this.state.SinglePost.post){
			let PostArray = []; 
			PostArray.push(this.state.SinglePost.post)
			return(	
			<div id="singlepost">
			<Posts Posts={PostArray} SinglePost="SinglePost" user={me} />
			</div>	
			);	
		} else {
			return(
			<div id="singlepost">
			<h1>loading...</h1>
			</div>
			);
		}
	}
}