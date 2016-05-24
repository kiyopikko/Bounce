import React          from 'react';
import Comment        from './Comment.js';
import ReactDOM       from 'react-dom'; 
import ChatAppActions from '../../actions/ChatAppActions.js';

export default class CommentList extends React.Component{
    constructor(){
        super()
        this.showMoreComments  = this.showMoreComments.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleResize      = this.handleResize.bind(this)
        this.state             = {
            windowWidth: window.innerWidth
        }
    }
    componentDidUpdate() {
        this.scrollHander()
    }
    scrollHander(godown){
        const dom        = ReactDOM.findDOMNode(this)
        let scrollbar    = (window.pageYOffset + 1000);
        let scrollHeight = dom.scrollHeight;
        let wWidth       = this.state.windowWidth; 
            if(godown === true){
                window.scrollTo(0,dom.scrollHeight) 
            }
            if(scrollbar > scrollHeight){
                 window.scrollTo(0,dom.scrollHeight)           
            }         
    }
    handleResize(e) {
        this.setState({windowWidth: window.innerWidth,Ypos:window.pageYOffset});
    }
    componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);
    window.addEventListener('resize', this.handleResize);
    window.scrollTo(0,dom.scrollHeight)
    this.setState({limit:30})
    }
    componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    }
    backToBottom(){
        this.scrollHander(true);
    }
    showMoreComments(){
        let roomAndLimit = {
            room:this.props.room,
            limit:this.state.limit + 30
        }
        ChatAppActions.showMoreChats(roomAndLimit); 
        this.setState({limit:this.state.limit += 30})
    }
    render() {
            const self = this;
            let Comments;
        if (!this.props.room){
            return(
                <h1>Please select a room</h1>
            ); 
        } else {
        if (this.props.comments) {
                Comments = this.props.comments.map(function (comment) {
                return (
                    <Comment 
                    user    = {self.props.username} 
                    comment = {comment} />
                    );
            });
        }
        return (
            <div className = "commentList">

                {this.props.comments[29] ? 

                <div className="limitAndTop">
                <button className="btn btn-info pull-left btn-md" onClick={this.showMoreComments.bind(this)}>Show earlier</button>
                <button className="btn btn-info pull-right btn-md" onClick={this.backToBottom.bind(this)}>Back to bottom</button>
                </div>
                :
                null
                }

                <ul className="list-group">                
                {Comments}
                </ul>

            </div>
        );
        }
    }
}