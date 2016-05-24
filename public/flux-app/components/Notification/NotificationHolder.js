import React    from 'react';
import ReactDOM from 'react-dom'; 
import Notice   from './Notice.js';

//  X button if needed
//	<span onClick={self.props.displayNotifications} className="notificationX">X</span>		
 
export default class NotificationHolder extends React.Component{
	goToTop(){
		const dom         = ReactDOM.findDOMNode(this);
		dom.scrollTop     = 0;
	}
	render(){
		let self = this;
		const me            = self.props.me;
		let notifications   = self.props.notifications;
		let allNotices      = (<div>loading. . .</div>);
		
		if(notifications.length > 0){
		allNotices          = notifications.map(function(notice){
			return(<Notice onClick={self.UpdateNotifications} me={me} notice={notice}/>);
        });
		} else {
			return(
				<h4 id="NotificationHolder">No notifications</h4>
				);
		}
		return(
			<div id="NotificationHolder">	
			<ul className="list-group">
		  {allNotices}
			</ul>
			{notifications.length > 9 ?
				<div>
				<button className="btn" onClick={self.props.showMore}>More</button>
				<button className="btn" onClick={self.goToTop.bind(this)}>Top</button>
				<button className="btn" onClick={self.props.refreshNotifications}>Refresh</button>
			 	</div> : null
			 }
			</div>
			);
	}
}
