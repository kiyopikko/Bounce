import BounceDispatcher from '../dispatcher/BounceDispatcher';
import BounceConstants from '../constants/BounceConstants';

export default {
	getNotifications:function(args){
		const xhr = new XMLHttpRequest();
		xhr.open('GET','getNotifications/'+args.username+'/'+args.limit,true);
		xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 2016 00:00:00 GMT"); 
		xhr.onreadystatechange = function(){ 
			if(xhr.readyState === 4){ 
				if(xhr.status === 200){  
					const Data = JSON.parse(xhr.response);
					BounceDispatcher.dispatch({
					actionType: BounceConstants.GET_USER_NOTIFICATIONS,
					Data:Data
					});
				} 
			}
		}
		xhr.send(null);
	}
}