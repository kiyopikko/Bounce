import React from 'react';
import ReactDOM from 'react-dom'; 
  
export default class MessageForm extends React.Component{
    constructor(){
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setMessage   = this.setMessage.bind(this)
        this.state        = {
            message:""
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.message.length < 1){
            return false;
        }      
        const user    = this.props.user;
        const message = { user:user , message: this.state.message};
        this.props.submitMessage(message)
        this.setState({message:""})
        ReactDOM.findDOMNode(this.refs.text).focus()
    }
    setMessage(e){
        this.setState({message:e.target.value})
    }
    render() {
            return (
            <div className    = "commentForm form-group">

            <form 
            onSubmit     = {this.handleSubmit}>
          
            <textarea
            maxLength    = "100" 
            name         = "message" 
            value        = {this.state.message} 
            onChange     = {this.setMessage} 
            ref          = "text" 
            placeholder  = "Comment" required>
            </textarea>

            <button 
            type         = "submit" 
            className    = "btn btn-primary pull-right"
            name         = "submitButton" 
            ref          = "submitButton">Send
            </button>

            </form>

            </div>
                );
        }
    
}