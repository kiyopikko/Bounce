import React from 'react';
import ReactDOM from 'react-dom'; 

import NotificationHolder  from './NotificationHolder.js';
import NotificationStore   from '../../stores/NotificationStore.js';
import NotificationActions from '../../actions/NotificationActions.js';

function getNotificationState (){ 
	return{  
	notificationState:NotificationStore.getNotificationAppState()
	} 
}; 

export default class Notifications extends React.Component{
	constructor(){
		super()
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this)
		this.componentDidMount    = this.componentDidMount.bind(this)
		this._updateNotifications = this._updateNotifications.bind(this)
		this.displayNotifications = this.displayNotifications.bind(this)
		this.state                = getNotificationState();
	}
	shouldComponentUpdate(nextProps, nextState) {
  	return true;
	}
	componentWillReceiveProps(){
		if(this.state.toggleNotifications === true){
			this.setState({toggleNotifications:false});
		}
	}
	displayNotifications(e){
        e.preventDefault()
        const dom         = ReactDOM.findDOMNode(this);
        let hamburgerButton = dom.parentNode.parentNode.children[1];
         
         if(hamburgerButton.className === "navbar-collapse collapse in"){
         	hamburgerButton.className = "navbar-collapse collapse"; 	
         }
                
        NotificationStore.restartNotificationLimit();
        this.setState({toggleNotifications:!this.state.toggleNotifications})
    }
    componentDidMount(){
   		NotificationStore.addChangeListener(this._updateNotifications)
		this.setNotificationInterval();
	}
	setNotificationInterval(){
		let username = this.props.me;
		let limit    = this.state.notificationState.limit;
		let query = {
        	username:username,
        	limit:limit
        	}
        this.getNotifications(query)		
		let intervalId = setInterval(() => {this.getNotifications(query)}, 3000);
    	this.setState({intervalId: intervalId});
	}
	
	getNotifications(query){
		NotificationActions.getNotifications(query)
	}

	componentWillUnmount(){
		NotificationStore.removeChangeListener(this._updateNotifications)
		clearInterval(this.state.intervalId);
	}

	showMore(){
		clearInterval(this.state.intervalId);
		NotificationStore.showMoreNotifications();
		this.setNotificationInterval();
	}

	_updateNotifications(){
		this.setState(getNotificationState())
	}

	refreshNotifications(){
		clearInterval(this.state.intervalId);
		NotificationStore.restartNotificationLimit();
		this.setNotificationInterval();
	}

    render(){
    	const self          = this;
		const toggler = self.state.toggleNotifications;
		const username      = self.props.me;
		let notifications;
		let notificationCounter = 0;

		if(self.state.notificationState.Notifications){
		notifications       = self.state.notificationState.Notifications[0].notifications;	
		notifications.map(function(notification){
			if(notification.seen === false){
				notificationCounter += 1;
			}
		});
		}
		return(
	    <div id="notificationDiv">

        <div className="notificationIcon" onClick={self.displayNotifications}>!{notificationCounter}</div>   
        
        {this.state.toggleNotifications ? 
        	<NotificationHolder  
        	me={username} 
        	toggler={toggler} 
        	displayNotifications={self.displayNotifications} 
        	notifications={notifications}
        	showMore={self.showMore.bind(this)}
        	refreshNotifications={self.refreshNotifications.bind(this)}
        	/> : null}

			</div>
			);
	}
}