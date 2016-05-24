import React             from 'react';
import ReactDOM          from 'react-dom';
import PostAppActions    from '../../actions/PostAppActions.js';
import SinglePostActions from '../../actions/SinglePostActions.js';

export default class Editor extends React.Component{
    constructor(){
        super()
        this.setComment = this.setComment.bind(this)
        this.state = {
            comment:""
        }
    }
    editPost(e){
        e.preventDefault();
        if(this.state.comment === "" ){
            this.state.comment = this.props.post.comment;
        }
        const ImgDirAndComment = {_id:this.props.post._id,ImgDir:this.props.post.ImgDir,comment:this.state.comment};

        PostAppActions.editPost(ImgDirAndComment)

        if(window.location.href.indexOf("SinglePost") > -1){
            //username
            console.log(this.props)
            SinglePostActions.getSinglePost({postId:this.props.post._id,username:this.props.post.user})
        }
        this.props.displayEditor()
    }
    setComment(e){ 
        const self = this;
        const comment = ReactDOM.findDOMNode(self.refs.Comment).value;
        this.setState({comment:comment})
    }
    render(){
        var comment = this.props.post.comment;
        return(
            <div className="form-group editor">
            
            <textarea className="commentTextarea form-control" ref="Comment" defaultValue={comment} onKeyUp={this.setComment.bind(this)} required></textarea>

            <button className="btn btn-success" onClick={this.editPost.bind(this)}>Save</button>
            </div>
            );
    }
}