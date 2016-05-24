import React                    from 'react';
import ReactDOM                 from 'react-dom'; 

import Notification             from '../Notification/Notification.js';
import ChatAppComponent         from '../ChatApp/ChatAppComponent.js'; 
import LoginSignupLogoutActions from '../../actions/LoginSignupLogoutActions.js';
import ChatAppActions           from '../../actions/ChatAppActions.js';

import  {Link} from "react-router";
 
export default class Nav extends React.Component{
    constructor(){
      super()
      this.hideNotifications = this.hideNotifications.bind(this)
      this.state = {
        hideNotifications:false
      }
    }
    logout(e){
        e.preventDefault();
        let username = this.props.username;
        console.log(username);
        LoginSignupLogoutActions.logout();
        ChatAppActions.logout(username);
        window.location.href = '/';
    }
    hideNotifications(){
      this.setState({hideNotifications:true})
    }
    closeNavBar(){
      let dom = ReactDOM.findDOMNode(this.refs.navBar);
      if(dom.className === "navbar-collapse collapse in"){
        dom.className = "navbar-collapse collapse";
      }      
    }
	  render() {
		return(

<nav className="navbar navbar-default navbar-fixed-top">
  <div className="container-fluid">

    <div className="navbar-header">

      <button onClick={this.hideNotifications.bind(this)} type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">Bounce</a>
       
      <Notification hideNotifications={this.state.hideNotifications} className="navbar-brand"me={this.props.username} />
    
    </div>

    <div ref="navBar" className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li onClick={this.closeNavBar.bind(this)}><Link to="/">Home</Link></li> 
        <li onClick={this.closeNavBar.bind(this)}><Link to="ChatApp">Chat</Link></li>
        <li onClick={this.closeNavBar.bind(this)}><Link to="PostApp">Post</Link></li>
        <li onClick={this.closeNavBar.bind(this)}><Link to="MyPage">User</Link> </li>
        <li onClick={this.logout.bind(this)}><a href="#">Logout</a></li> 
      </ul>
    </div>
  </div>
</nav>
		);
	}
}