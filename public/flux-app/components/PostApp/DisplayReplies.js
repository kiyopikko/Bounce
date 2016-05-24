import React from 'react';
import PostsReplies      from './PostsReplies';
import RepliesAppStore   from '../../stores/RepliesAppStore.js';
import RepliesAppActions from '../../actions/RepliesAppActions.js';
 
function getReplies(Data){
    return{
        replies:RepliesAppStore.getReplies(Data)
    }
}

export default class DisplayReplies extends React.Component{ 
    constructor(){
        super()
        this._updateReplies = this._updateReplies.bind(this)
        this.state = getReplies(this.props.ImgDir);
    }
    componentDidMount(){
        RepliesAppStore.addChangeListener(this._updateReplies);
    }
    componentWillUnmount(){
    RepliesAppStore.removeChangeListener(this._updateReplies);
    }
    _updateReplies(){
        this.setState(getReplies(this.props.ImgDir));
    }   
    render(){   
           return( 
            <ul className="list-group">  
            <PostsReplies reply={this.state}/>
            </ul> 
            ); 
    }
}