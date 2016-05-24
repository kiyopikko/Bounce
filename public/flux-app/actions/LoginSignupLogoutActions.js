import BounceDispatcher from '../dispatcher/BounceDispatcher';
import BounceConstants  from '../constants/BounceConstants';
import ChatAppActions   from './ChatAppActions.js';

export default {
	login:function(formData){
        const self = this;
		const xhr = new XMLHttpRequest();
        xhr.open('POST','/api/login');
        xhr.setRequestHeader("content-type","application/json");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    var response = JSON.parse(xhr.response);
                    
                    BounceDispatcher.dispatch({
					actionType: BounceConstants.LOG_IN,
					formData:response
					});

                }   
            }
        };
        xhr.send(JSON.stringify(formData));
	},
	signup:function(formData){

		 const xhr = new XMLHttpRequest();
        xhr.open('POST','/api/signup');
        xhr.setRequestHeader("content-type","application/json");
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    var response = JSON.parse(xhr.response);                  
                    
                    BounceDispatcher.dispatch({
					actionType:BounceConstants.SIGN_UP,
					formData:response
					});

                }
            }
        };
        xhr.send(JSON.stringify(formData));
	},
	logout:function(formData){
		BounceDispatcher.dispatch({
			actionType:BounceConstants.LOG_OUT,
			formData:formData
		});
	}
}