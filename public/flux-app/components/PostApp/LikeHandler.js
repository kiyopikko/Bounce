import React             from 'react';
import Liked             from './Liked'; 
import NotLiked          from './NotLiked';
import PostAppActions    from '../../actions/PostAppActions.js';
import MyPageAppActions  from '../../actions/MyPageAppActions.js';
import UserPageActions   from '../../actions/UserPageActions.js';
import SinglePostActions from '../../actions/SinglePostActions.js';
import {Router, 
    Route, 
    IndexRoute,
    hashHistory}         from "react-router";

export default class LikeHandler extends React.Component{
    constructor(){
        super()
        this.Like              = this.Like.bind(this)
        this.Unlike            = this.Unlike.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.state             = {
            liked:false
        }
    }
    componentDidMount(){
        //get username from props not localstorage
        const self  = this;
        const me    = this.props.me;
        const likes = this.props.likes;
        let i;
        for(i=0; i<likes.length; i++){
            if(likes[i].user === me){
                self.setState({liked:true})
            }
        }
    }
    Like(e){ 
        e.preventDefault();
        this.setState({liked:true})
        const ImgUser = this.props.ImgUser;
        const me      = this.props.me;
        const ImgDir  = this.props.ImgDir;
        const id      = this.props.id;
        const UserImg = {ImgDir:ImgDir,user:me,ImgUser:ImgUser,postId:id}; 
        PostAppActions.like(JSON.stringify(UserImg))
       this.actionGetter();
    }
    Unlike(e){  
        e.preventDefault();
        this.setState({liked:false})
        const ImgUser = this.props.ImgUser;
        const me      = this.props.me;
        const ImgDir  = this.props.ImgDir;
        const id      = this.props.id;
        const UserImg = {ImgDir:ImgDir,user:me, ImgUser:ImgUser, postId:id};
        PostAppActions.unlike(JSON.stringify(UserImg))  
        this.actionGetter()     
    }
    actionGetter(){
        const ImgUser = this.props.ImgUser;
        const me      = this.props.me;
        const ImgDir  = this.props.ImgDir;
        const id      = this.props.id;
        if(window.location.href.indexOf("MyPage") > -1){
            MyPageAppActions.getUserInfo(me)
        }
        if(window.location.href.indexOf("UserPage") > -1){
            UserPageActions.getUserpage(ImgUser)
        }
        if(window.location.href.indexOf("SinglePost") > -1){
            SinglePostActions.getSinglePost({postId:id,username:me})
        }
    }
    render(){
        const self  = this;
        const likes = this.props.likes;
        if(this.state.liked === true){
            return(
                    <Liked Unlike={self.Unlike.bind(this)} counter={likes}/>
                    )
        }
        if(this.state.liked === false){
        return(
            <NotLiked Like={self.Like.bind(this)} counter={likes}/>
            );
        }
    }
}