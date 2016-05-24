import BounceDispatcher from '../dispatcher/BounceDispatcher';
import BounceConstants from '../constants/BounceConstants';

export default {
	postReply:function(Data){
		const self = this;
		const xhr = new XMLHttpRequest();
        xhr.open('POST','ReplyToPost');
        xhr.setRequestHeader('content-type','application/json');
        xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 2016 00:00:00 GMT");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const response = xhr.responseText;
                    if(response){ 
                      self.getReplies();
                	}
                }	
            }
        }
        xhr.send(JSON.stringify(Data)); 
	},
	getReplies: function(){
		const xhr = new XMLHttpRequest();
	        xhr.open('GET','/GetRepliesToPost');    
	        xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 2016 00:00:00 GMT");
	        xhr.onreadystatechange = function(){ 
	        	if(xhr.readyState === 4){ 
	        		if(xhr.status === 200){ 
	        		const Replies = JSON.parse(xhr.responseText);
	        			if(Replies){    
	        			REPLIES_TO_STORE(Replies)
    					}
        			}
        		}
        	}	
        xhr.send(null);
		
		const REPLIES_TO_STORE = function(Replies){
            BounceDispatcher.dispatch({
		 		actionType: BounceConstants.GET_REPLIES,
		 		Data:Replies
		 	});
        }

	}
}