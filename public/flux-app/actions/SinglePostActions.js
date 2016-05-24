import BounceDispatcher from '../dispatcher/BounceDispatcher';
import BounceConstants from '../constants/BounceConstants';

export default {
	getSinglePost(postInfo){
		const self = this; 
		const xhr = new XMLHttpRequest()
        xhr.open('GET','/getSinglePost/'+postInfo.postId+"/"+postInfo.username,true)
        xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 2016 00:00:00 GMT");
		xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const Post = JSON.parse(xhr.responseText)
               			if(Post){
               			BounceDispatcher.dispatch({
						          actionType: BounceConstants.SET_SINGLE_POST,
						          Data:Post
						        });
               			}
            	 }
            } 
        }
        xhr.send(null); 
  }
}