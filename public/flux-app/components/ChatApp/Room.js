import React from 'react';
import ChatAppActions from '../../actions/ChatAppActions.js';

export default class Room extends React.Component{
    switchRoom(e){
            e.preventDefault();
                const room        = this.props.room.room;
                const user        = this.props.user;
                const RoomAndUser = {room:room,user:user};
                ChatAppActions.switchRoom(RoomAndUser);
    }       
    render(){
        if (this.props.current_room === true){
            return( 
                <li className="list-group-item"> 
                (current) {this.props.room.room} 
                </li>
                );
        };
        return(
        <li className="list-group-item" ><a href="#" name="name" onClick={this.switchRoom.bind(this)}> {this.props.room.room} </a></li>
        );
    }
}