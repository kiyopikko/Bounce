import React                    from 'react';
import ReactDOM                 from 'react-dom';
import Signup                   from './LoginSignup/Signup.js'; 
import Login                    from './LoginSignup/Login.js';
import Home                     from './Home.js';
import ChatAppComponent         from './ChatApp/ChatAppComponent.js';
import Nav                      from './Navigation/Nav.js';
import LoginSignupLogoutStore   from '../stores/LoginSignupLogoutStore.js';
import LoginSignupLogoutActions from '../actions/LoginSignupLogoutActions.js';
import  {Link}                  from "react-router";

const init = function(){LoginSignupLogoutStore.setToken();}

init();

function getLoginState(){
    return{
        loggedIn:LoginSignupLogoutStore.getLoginState(),
        windowWidth:window.innerWidth,
    }
}

export default class LandingPage extends React.Component{
    constructor(){
        super()
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleResize      = this.handleResize.bind(this)
        this._onChange         = this._onChange.bind(this)
        this.state             = getLoginState()
    }
    componentDidMount(){
    LoginSignupLogoutStore.addChangeListener(this._onChange);
    window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
    LoginSignupLogoutStore.removeChangeListener(this._onChange);
    window.removeEventListener('resize', this.handleResize);
    }
    login(formData){
        LoginSignupLogoutActions.login(formData);
    } 
    signup(formData){
        LoginSignupLogoutActions.signup(formData);
    }
    handleResize(e) {
    this.setState({windowWidth: window.innerWidth});
    }
    _onChange(){
        this.setState(getLoginState());
    }
    goBack(){
        let i;const self = this;
        const mobileNavToggle = ReactDOM.findDOMNode(self.refs.mobileNavToggle)
        for(i=0; i< mobileNavToggle.classList.length;i=i+1){
            if(mobileNavToggle.classList[i] === "change"){
                history.go(-1);
                return;
            }
        }
        return;
    }
    render(){
        let signupErrorMessage;
        let loginErrorMessage;

        let childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, { LoginState: this.state });
        });

        if(this.state.loggedIn.message){ 
        signupErrorMessage = this.state.loggedIn.message.errorMessage.signupErrorMessage; 
        loginErrorMessage = this.state.loggedIn.message.errorMessage.loginErrorMessage; 
        }
         
        if(this.state.loggedIn.loggedIn === false){ 
        return(
            <div className="container loginsignupDiv">
            <h1>Bounce</h1>
            <Login login={this.login} errorMessage={loginErrorMessage}/> 
            <Signup signup={this.signup} errorMessage={signupErrorMessage}/> 
            <div className="loginFooter">
            </div>
            </div>
            );     
        }
        
        if(this.state.loggedIn.loggedIn === true){
            let username = this.state.loggedIn.username;
        return(
        <div>
        
        <Nav username={username} LoginState={this.state.loggedIn}/>

        {childrenWithProps}
        
        </div>
            );
        }
         return(<div>
         </div>
         );
    }
}