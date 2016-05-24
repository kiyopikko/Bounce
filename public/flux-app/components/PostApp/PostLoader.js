import React from 'react';
import PostAppActions from '../../actions/PostAppActions.js';
import PostAppStore from '../../stores/PostAppStore.js';
import LoginSignupLogoutStore from '../../stores/LoginSignupLogoutStore.js';
import Posts from './Posts.js';

function getPostAppState(query){ 
    return{
        PostAppState:PostAppStore.getPostAppState(query) 
    }
}
 
export default class PostLoader extends React.Component{
    constructor(){
        super()
        this.setPostInterval      = this.setPostInterval.bind(this);
        this.showMore             = this.showMore.bind(this)
        this.componentDidMount    = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this._getPosts            = this._getPosts.bind(this)
        this.state                = getPostAppState()
    }

    componentDidMount(){
    PostAppStore.addChangeListener(this._getPosts);
    this.setPostInterval();
    }

    setPostInterval(){
        var query = {
            postsLength:this.state.PostAppState.postsLength,
            latestPost:this.state.PostAppState.latestPost,
            oldestPost:this.state.PostAppState.oldestPost,
            limit:this.state.PostAppState.limit
        }
        PostAppActions.getPosts(query);
        let intervalId = setInterval(() => {this.getPosts(query)}, 3000);
        this.setState({intervalId: intervalId});
    }

    getPosts(query){
        PostAppActions.getPosts(query);
    }

    componentWillUnmount() {
    PostAppStore.removeChangeListener(this._getPosts);
    clearInterval(this.state.intervalId);
    }
    
    _getPosts(){
    this.setState(getPostAppState());
    }

    showMore(){
    clearInterval(this.state.intervalId);
    PostAppStore.showMorePosts();
    this.setPostInterval();
    }

    backToTop(){
        window.scrollTo(0,0);
    }
        
    refreshStart(){
        PostAppStore.showLessPosts();
        window.scrollTo(0,0);
    }

    render(){
        return(
            <div>
        <Posts Posts={this.state.PostAppState.posts} user={this.props.user}/>

<div className="btn-group btn-group-justified" role="group" aria-label="...">
  <div className="btn-group" role="group">
    <button type="button" className="btn btn-default" onClick={this.showMore}>More posts</button>
  </div>
  <div className="btn-group" role="group">
    <button type="button" className="btn btn-default" onClick={this.backToTop}>Top</button>
  </div>
  <div className="btn-group" role="group">
    <button type="button" className="btn btn-default" onClick={this.refreshStart}>Refresh</button>
  </div>
</div>

            </div>
            );
    }
    
}