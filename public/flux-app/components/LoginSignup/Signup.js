import React from 'react'; 
import ReactDOM from 'react-dom';
 
export default class Signup extends React.Component{
    
    handleSubmit(e){
        e.preventDefault()
        const self = this;
        const username = ReactDOM.findDOMNode(self.refs.username)
        const password = ReactDOM.findDOMNode(self.refs.password)
        const password2 = ReactDOM.findDOMNode(self.refs.password2)
        if(!password.value.length || !password2.value.length || !username.value.length){
            return this.errorHandler("Please fill in all fields");
        }
        if(password.value !== password2.value){
            this.errorHandler('Re-enter passwords')
            password.value = "";
            password2.value = "";
            return false;
        }
        const formData = {username:username.value,password:password.value};
        this.props.signup(formData)
        username.value = "";
        password.value = "";
        password2.value = "";
    }
    
    componentDidUpdate(){
        if(this.props.errorMessage){
            this.errorHandler(this.props.errorMessage)
        }
    }
    
    errorHandler(errorMessage){
        const self = this;
        const errorDiv = ReactDOM.findDOMNode(self.refs.errorDiv)
        errorDiv.innerHTML = errorMessage; 
        errorDiv.className = "errorDiv";
        setTimeout(function(){
            errorDiv.className = "";
            errorDiv.innerHTML = "";
        },5000);
    }

    render(){
        return(            
            <div>
                
                <h4>Sign up</h4>
                
                <div ref="errorDiv"></div>

                <form className        =  "uploadForm"
                encType   =  "multipart/form-data"  
                 action    =  "/Signup"
                 method    =  "post" 
                 onSubmit={this.handleSubmit.bind(this)}>  
                
                <div className="form-group">  
                <label>Username:</label>
                <input className="form-control" maxLength="15" type="text" ref="username" name="username" required/>
                </div>
                
                <div className="form-group">
                <label>Password: </label>
                <input  className="form-control" maxLength="20" type="password" ref="password" name="password" required/>
                </div>

                <div className="form-group">
                <label>Re-enter password: </label>
                <input className="form-control" maxLength="20" type="password" ref="password2" name="password" required/>
                </div>
                
                <div>
                <button type="submit" className="btn btn-default submit-button pull-right">Sign up</button>
                </div>

                </form>
                </div>
            );
    }
}