import React          from 'react'; 
import ReactDOM       from 'react-dom';
import ChatAppActions from '../../actions/ChatAppActions.js';

export default class Create_Destroy_Room extends React.Component{
    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            room:""
        }
    }
    Destroy_Room(){
        const My_Room = this.props.My_Room;
        ChatAppActions.destroyRoom(My_Room);
    }
    handleChange(e){
        console.log(e.target.value);
        if(e.target.value.length > 20){
            return false;
        }
        this.setState({room:e.target.value});
        this.props.handleChange(e.target.value)
    }
    render(){
        let CreatedRoom = null;
        const me        = this.props.user;
        const Rooms     = this.props.rooms;
        const self      = this;
        let myroom;   
        if(Rooms){
        for (let i=0; i < Rooms.length; i++){
            if(Rooms[i].host === me){
                myroom = this.props.rooms[i].room;
                return (<div> 
                    
                    <button 
                    className="btn btn-block btn-block btn-danger"
                    onClick = {self.Destroy_Room.bind(this)}> 
                    Destroy {myroom}
                    </button> 
                    
                    </div>);
            }
        }
        }
        return (
        <div className="createRoom">

        <div className="form-group">
         <input 
         type        = "text" 
         className   = "form-control"
         name        = {CreatedRoom} 
         placeholder = "Insert room name"
         value       = {this.state.room} 
         onKeyUp     = {this.handleKeyup}
         onChange    = {this.handleChange.bind(this)} required/>

        <button 
        className = "btn btn-default btn-block btn-info" 
        onClick   = {this.props.CreateRoom.bind(this)}>
        Create room
        </button>

        </div>
        </div>
        );    
    }
}