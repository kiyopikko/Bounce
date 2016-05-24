import React             from 'react'; 
import ReactDOM          from 'react-dom'; 
import RepliesAppActions from '../../actions/RepliesAppActions.js'; 

export default class ReplyComment extends React.Component{ 
    constructor(){ 
        super()
        this.ReplyTextArea = this.ReplyTextArea.bind(this)
        this.PostReply     = this.PostReply.bind(this)
        this.state         = {
            message:"",
            usersInComments:[]
        }
    }
    componentDidMount(){
        this.userChecker()
        let me = this.props.user
    }
    componentDidUpdate(){
        this.userChecker()
    }
    userChecker(){
        let i,j,k;
        const comments        = this.props.comments;
        const usersInComments = [];  
        for(i = 0; i < comments.length; i++){
                usersInComments.push(comments[i].user)
        }
        var uniq = usersInComments.reduce(function(a,b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
        },[]);
        this.state.usersInComments = uniq;
    }
    ReplyTextArea(e){
        e.preventDefault()
        const self            = this;
        const textareaMessage = ReactDOM.findDOMNode(self.refs.Reply).value;
        this.setState({message:textareaMessage})
    }
    PostReply(){
        if(this.state.message.length < 1){
            return false;
        }
        const self     = this;
        const me       = this.props.user;
        const users    = this.state.usersInComments;
        let userLength = users.length;

        const Data  = {
                        postId:this.props.postId,
                        ImgDir:this.props.ImgDir,
                        comment:this.state.message,
                        user:me, 
                        ImgUser:this.props.ImgUser,
                        usersInComments:users
                    };

        RepliesAppActions.postReply(Data)
        RepliesAppActions.getReplies()
        this.setState({comment:null,message:null})
        ReactDOM.findDOMNode(self.refs.Reply).value = "";
    }
    render(){
        return(
            <div className    = "replyComment form-group">
            
            <textarea 
            maxLength="100"
            onKeyUp = {this.ReplyTextArea.bind(this)} 
            ref               = "Reply" 
            placeholder="Say something"
            className="form-control"
            required>
            </textarea>
            
            <span onClick = {this.PostReply.bind(this)}>
            Comment
            </span>
            
            </div>
            );
    }
}