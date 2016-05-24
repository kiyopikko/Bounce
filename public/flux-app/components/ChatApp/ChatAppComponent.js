import React from 'react';
import ReactDOM from 'react-dom';  

import ChatAppStore from '../../stores/ChatAppStore.js';
import ChatAppActions from '../../actions/ChatAppActions.js';
import  {Link} from "react-router";
 
function getChatAppState(){
    return{
        ChatAppState:ChatAppStore.getChatAppState()
    }
} 

export default class ChatAppComponent extends React.Component{ 
	constructor(){
        super()
        this._updateApp = this._updateApp.bind(this) 
        this.state = getChatAppState()
    }
    componentDidMount(){
    ChatAppStore.addChangeListener(this._updateApp)
    }

    componentWillUnmount() {
    ChatAppStore.removeChangeListener(this._updateApp)   
    }
    render() {
        let current_room = this.state.ChatAppState.current_room;
        let childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, { ChatAppState: this.state });
        });
        
        return (<div id="ChatApp">

<div id="roomsAndSelected" className="btn-group btn-group-justified roomsAndSelected" role="group" aria-label="...">
  <div className="btn-group" role="group">
    <button type="button" className="btn btn-info"> <Link to="ChatApp/ChatNav">ROOMS</Link></button>
  </div>

  {this.state.ChatAppState.current_room ? 
  <div className="btn-group" role="group">
  <button type="button" className="btn btn-success"> 
  <Link to="ChatApp/ChatRoom"> {current_room} </Link>
  </button>
  </div> : null }

</div>



        {childrenWithProps}

        </div>
        );
    }
    _updateApp(){
        this.setState(getChatAppState());
    }
}