import BounceDispatcher from '../dispatcher/BounceDispatcher';
import BounceConstants from '../constants/BounceConstants';

export default {
	requestUserPage(usernameAndLimit){
        let username = usernameAndLimit.username || usernameAndLimit; 
        const self = this; 
		const xhr = new XMLHttpRequest()
        xhr.open('GET','/userpage/:?username='+username,true)
        xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 2016 00:00:00 GMT");
		xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const UserPageData = JSON.parse(xhr.responseText)
                    
						BounceDispatcher.dispatch({
						actionType: BounceConstants.SET_USER_PAGE_INFO,
						Data:UserPageData
						});
                        self.getUserpage(usernameAndLimit);
            	}
            } 
        }
        xhr.send(null);
	},
    getUserpage(usernameAndLimit){
        let username = usernameAndLimit.username || usernameAndLimit;
        let limit    = usernameAndLimit.limit    || 10;
        const xhr = new XMLHttpRequest()
        xhr.open('GET','/usersposts/'+username+"/"+limit,true);
        xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 2016 00:00:00 GMT");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const UserPagePosts = JSON.parse(xhr.responseText)        
                        BounceDispatcher.dispatch({
                        actionType: BounceConstants.GET_USER_PAGE_POSTS,
                        Data:UserPagePosts
                        });
                }
            } 
        }
        xhr.send(null);
    }
}