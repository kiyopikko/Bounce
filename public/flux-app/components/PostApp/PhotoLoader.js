import React          from 'react';
import ReactDOM       from 'react-dom';
import PostAppStore   from '../../stores/PostAppStore.js';
import PostAppActions from '../../actions/PostAppActions.js';

export default class PhotoLoader extends React.Component{
    handleSubmit(e) {
        e.preventDefault();
        const me            = this.props.user;
        const self          = this;        
        const formData      = new FormData();
        const file          = ReactDOM.findDOMNode(self.refs.userPhoto).files[0];
        const ImageComment  = ReactDOM.findDOMNode(self.refs.ImageComment);

        if(!file || !ImageComment){
            return false;
        }
        
        const postData      = {comment:ImageComment.value, user:me};
        const output        = ReactDOM.findDOMNode(self.refs.photoviwer);
        const preview       = ReactDOM.findDOMNode(self.refs.preview);
        
        const postFileButton   =  ReactDOM.findDOMNode(self.refs.postFileButton);
        const customFileUpload =  ReactDOM.findDOMNode(self.refs.customFileUpload);
        
        formData.append('userPhoto',file);

        PostAppActions.postFile({file:file,postData});
  
        ReactDOM.findDOMNode(self.refs.ImageComment).value = "";
        ReactDOM.findDOMNode(self.refs.userPhoto).value = null;
        
        preview.innerHTML              = "";
        output.removeAttribute("src");
        output.style.display           = "none";
        postFileButton.style.display   = "none";
        customFileUpload.style.display = "block";
       }
    displayImg(e){
        const self             = this;
        const output           = ReactDOM.findDOMNode(self.refs.photoviwer);
        const preview          = ReactDOM.findDOMNode(self.refs.preview);
        const postFileButton   = ReactDOM.findDOMNode(self.refs.postFileButton);
        const customFileUpload = ReactDOM.findDOMNode(self.refs.customFileUpload);
        
        if(!e.target.files[0]){
            return false;
        }
        output.style.display = "block";
        preview.innerHTML = "preview";
        output.src = URL.createObjectURL(e.target.files[0]);
        postFileButton.style.display = "block";
        customFileUpload.style.display = "none";
        this.setState({viewPost:true})
       }
    render(){
      return(
            <div id="PostFormDiv" className="form-group">
                <form id        =  "uploadForm"
                 encType   =  "multipart/form-data"
                 action    =  "/photo"
                 method    =  "post" 
                 onSubmit={this.handleSubmit.bind(this)}
                 >
                <p className="preview" ref="preview"></p> 
                <img ref="photoviwer" id="photoviwer"></img>
                
                <textarea maxLength="100" type="text" ref="ImageComment" placeholder="What's happening?" className="imageTextarea form-control" required></textarea>
                

                <label className="custom-file-upload btn btn-info" ref="customFileUpload">
                <input type="file" ref="userPhoto" id="imgInp" onChange={this.displayImg.bind(this)} required/>
                Upload Image
                </label>

                <button className="postFileButton btn btn-info" ref="postFileButton" type="submit" name="submit">Post</button>
            
               </form>
            </div>
            );
        }        
}
                
               
