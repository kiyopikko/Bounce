import React from 'react';

import ClubDiscounts from './ClubDiscounts.js';
import RoomBoxes from './RoomBoxes.js';

import ChatAppActions from '../../actions/ChatAppActions.js';
import Create_Destroy_Room from './Create_Destroy_Room.js';

export default class RoomBox extends React.Component{
    constructor(){
        super() 
        this.HandleChange = this.HandleChange.bind(this)
        this.CreateRoom = this.CreateRoom.bind(this)
        this.ShowDiscounts = this.ShowDiscounts.bind(this)   
        this.state = {
            CreatedRoom:'',
            hasRoom: false
        }
    }
    HandleChange(e) { 
        e.preventDefault();
        this.setState({CreatedRoom:e.target.value.substr(0, 15)});
    }
    CreateRoom(e){
        e.preventDefault();
        const me = this.props.user;
        const NewRoom = this.state.CreatedRoom;
        const room = {room:NewRoom, host:me};
        ChatAppActions.createRoom(room);
    }
    ShowDiscounts(){
        const me = this.props.user;
        const room =  this.props.current_room;
        const RoomAndUser = {me:me,room:room}; 
        ChatAppActions.showPosts(RoomAndUser);
    }
    render(){
        const rooms = this.props.rooms;
        const current_room = this.props.current_room;
            return(
                <div className="RoomBox">
            
            <ClubDiscounts 
            ShowDiscounts={this.ShowDiscounts.bind(this)} 
            current_room={current_room}/>
            
            <Create_Destroy_Room 
            user={this.props.user} 
            rooms={rooms} CreateRoom={this.CreateRoom.bind(this)}  
            handleChange={this.HandleChange.bind(this)} 
            roomInfo={this.state} 
            My_Room={this.props.My_Room}/>
            
            <RoomBoxes 
            user={this.props.user} 
            rooms={this.props.rooms} 
            UsersConnected={this.props.UsersConnected} 
            current_room={this.props.current_room} 
            UsersInThisRoom={this.props.UsersInThisRoom}/>
               
            </div>
                );
        }
}