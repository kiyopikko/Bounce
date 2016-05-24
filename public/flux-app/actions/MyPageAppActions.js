import BounceDispatcher         from '../dispatcher/BounceDispatcher';
import BounceConstants          from '../constants/BounceConstants';
import LoginSignupLogoutActions from './LoginSignupLogoutActions';
 
export default {
	deleteUser: function (Data){
		//get  token and id from login store or local storage?
		const token = localStorage.token;
		const id = localStorage._id;
		const userData = {token:token,username:Data,_id:id};
		const xhr = new XMLHttpRequest();
		xhr.open('DELETE','/api/deleteUser');
		xhr.setRequestHeader('content-type','application/json');
		xhr.onreadystatechange = function(){ 
			if(xhr.readyState === 4){ 
				if(xhr.status === 200){  
					LoginSignupLogoutActions.logout();
				} 
			}
		}
		xhr.send(JSON.stringify(userData));
	},
	editUser:function(Data){

		const xhr = new XMLHttpRequest();
		xhr.open('PUT','/changeUserInfo');
		xhr.setRequestHeader('content-type','application/json');
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					BounceDispatcher.dispatch({
					actionType: BounceConstants.EDIT_USER,
					Data:Data
					});

				}
			}
		}
		xhr.send(JSON.stringify(Data));
	}, 
	getUserInfo: function(usernameAndLimit){
		const self     = this;
		const username = usernameAndLimit.username;
		const xhr      = new XMLHttpRequest();
		xhr.open('GET','/GetUserInfo/:?username='+username,true);
		xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 2016 00:00:00 GMT");
		 xhr.onreadystatechange = function(){ 
            if(xhr.readyState === 4){ 
                if(xhr.status === 200){ 
                const response = JSON.parse(xhr.responseText);        

                BounceDispatcher.dispatch({
				actionType: BounceConstants.GET_USER_INFO,
				Data:response
				});
                self.getUserPosts(usernameAndLimit)
                } 
            } 
        }; 
        xhr.send(null);
	},
	getUserPosts:function(usernameAndLimit){
		const username = usernameAndLimit.username;
		const limit    = usernameAndLimit.limit;
		const xhr      = new XMLHttpRequest();
		xhr.open('GET',"/GetUserPosts/"+username+"/"+limit,true);
		xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 2016 00:00:00 GMT");
		 xhr.onreadystatechange = function(){ 
            if(xhr.readyState === 4){ 
                if(xhr.status === 200){ 
                const Posts = JSON.parse(xhr.responseText);        
              
                BounceDispatcher.dispatch({
				actionType: BounceConstants.GET_USER_POSTS,
				Data:Posts
				});

                } 
            } 
        }; 
        xhr.send(null);
	}
}