import BounceDispatcher from '../dispatcher/BounceDispatcher';
import BounceConstants from '../constants/BounceConstants';
import RepliesAppActions from './RepliesAppActions.js'; 

export default {
	getPosts:function(args){
        if(typeof args === "object"){
            const xhr = new XMLHttpRequest();
            xhr.open('GET','/LatestImages/'+args.postsLength+"/"+args.latestPost+"/"+args.oldestPost+"/"+args.limit,true); 
            xhr.setRequestHeader("content-type","application/json");
            xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 2016 00:00:00 GMT");
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        const Posts = JSON.parse(xhr.responseText);
                        if(Posts){
                    
                            BounceDispatcher.dispatch({
                            actionType: BounceConstants.GET_POSTS,
                            Data:Posts
                            });
                            RepliesAppActions.getReplies();

                        }
                    }
                } 
            }
            xhr.send(null);    
        } else { 
            return false;
        }
	},
	postFile:function(Data){
        console.log(Data);
    	var self = this;     
    	const formData = new FormData();
    	formData.append('userPhoto',Data.file);
        formData.append('user',Data.postData.user);
        formData.append('comment',Data.postData.comment);

        const xhr = new XMLHttpRequest();
        xhr.open('POST','/imageUpload',true);
        xhr.overrideMimeType('application/json');
        xhr.send(formData);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const response = xhr.responseText;
                    console.log(response);
                     self.getPosts({limit:10});
                }
            }
        }
	},
	deletePost:function(deleteData){
		var self = this;
		const xhr = new XMLHttpRequest();
        xhr.open('DELETE','/deletePost');
        xhr.setRequestHeader("content-type","application/json");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    let response = xhr.responseText;
                    if(response){
                        self.getPosts({limit:10});
                    }
                }
            }
        }
        xhr.send(JSON.stringify(deleteData));
	},
	editPost: function(Data){
		var self = this;
     	const xhr = new XMLHttpRequest();
        xhr.open('PUT','/editPost');
        xhr.setRequestHeader("content-type","application/json");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const response = xhr.responseText;
                    self.getPosts();
                }
            }
        }
        xhr.send(JSON.stringify(Data));
	},
	like:function(Data){
		const self = this;
		const xhr = new XMLHttpRequest();
        xhr.open('PUT','AjaxLiker');
        xhr.setRequestHeader('content-type','application/json');
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                self.getPosts();
                }
            }
        }
        xhr.send(Data);
	},
	unlike:function(Data){
		const self = this;
		const xhr = new XMLHttpRequest();
        xhr.open('PUT','AjaxUnLiker');
        xhr.setRequestHeader('content-type','application/json');
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                self.getPosts();
                }
            }
        }
        xhr.send(Data);
	}
}