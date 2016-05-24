import React from 'react';
import ReactDOM from 'react-dom';

export default class Login extends React.Component{ 
    handleSubmit(e){    
        e.preventDefault()
        const self = this;
        const username = ReactDOM.findDOMNode(self.refs.username)
        const password = ReactDOM.findDOMNode(self.refs.password)
        /*
        if(username.length || password.length < 1){ 
            this.errorMessage("Please enter username or password") 
            return false; 
        } */
        const formData = {username:username.value,password:password.value};
        this.props.login(formData)
        username.value = "";
        password.value = "";
    }
    componentDidUpdate(){
        if(this.props.errorMessage){
            this.errorHandler(this.props.errorMessage)
        }
    }
    errorHandler(errorMessage){
        const self = this;
        const errorDiv = ReactDOM.findDOMNode(self.refs.errorDiv);
        errorDiv.innerHTML = errorMessage; 
        errorDiv.className = "errorDiv";
        setTimeout(function(){
            errorDiv.className = "";
            errorDiv.innerHTML = "";
        },5000)
    }
    render() {
        return(<div>

                <h4>Login</h4>
            
                <div ref="errorDiv"></div> 
                
                <form className =  "uploadForm"
                 encType    =  "multipart/form-data"
                 action     =  "/Login"
                 method     =  "post" 
                 onSubmit={this.handleSubmit.bind(this)}> 

                <div className="form-group">
                <label>Username:</label>
                <input className="form-control" maxLength="20" type="text" name="username" ref="username" required/>
                </div>

                <div className="form-group">
                <label>Password: </label><br/>
                <input className="form-control" maxLength="20" type="password"ref="password" name="password" required/>
                </div>

                <div>
                <button type="submit" className="btn btn-default submit-button pull-right">Login</button>
                </div>

                </form>
                </div>
                );
    }
}