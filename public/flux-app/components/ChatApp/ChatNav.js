import React from 'react';

import ClubDiscounts from './ClubDiscounts.js';
import RoomBoxes from './RoomBoxes.js';

import ChatAppActions from '../../actions/ChatAppActions.js';
import Create_Destroy_Room from './Create_Destroy_Room.js';


export default class ChatNav extends React.Component{
    constructor(){
        super()
        this.HandleChange  = this.HandleChange.bind(this)
        this.CreateRoom    = this.CreateRoom.bind(this)
        this.ShowDiscounts = this.ShowDiscounts.bind(this)   
        this.state         = {
            CreatedRoom:'',
            hasRoom: false
        }
    }
    HandleChange(createdroom) { 
        this.setState({CreatedRoom:createdroom});
    }
    CreateRoom(e){
        e.preventDefault();
        const me      = this.props.ChatAppState.ChatAppState.user;
        const NewRoom = this.state.CreatedRoom;
        const room    = {room:NewRoom, host:me};
        ChatAppActions.createRoom(room);
    }
    ShowDiscounts(){
        const me          = this.props.user;
        const room        =  this.props.ChatAppState.ChatAppState.current_room;
        const RoomAndUser = {me:me,room:room}; 
        ChatAppActions.showPosts(RoomAndUser);
    }
    render(){
            const rooms        = this.props.ChatAppState.ChatAppState.rooms;
            const current_room = this.props.ChatAppState.ChatAppState.current_room;
            return(

            <div className="RoomBox">
            
            <ClubDiscounts 
            ShowDiscounts = {this.ShowDiscounts.bind(this)} 
            current_room  = {current_room}
            />
            
            <Create_Destroy_Room 
            user         = {this.props.ChatAppState.ChatAppState.user} 
            rooms        = {rooms} 
            CreateRoom   = {this.CreateRoom.bind(this)}  
            handleChange = {this.HandleChange.bind(this)} 
            roomInfo     = {this.state} 
            My_Room      = {this.props.ChatAppState.ChatAppState.My_Room}
            />
            
            <RoomBoxes 
            user            = {this.props.ChatAppState.ChatAppState.user} 
            rooms           = {this.props.ChatAppState.ChatAppState.rooms} 
            UsersConnected  = {this.props.ChatAppState.ChatAppState.UsersConnected} 
            current_room    = {this.props.ChatAppState.ChatAppState.current_room} 
            UsersInThisRoom = {this.props.ChatAppState.ChatAppState.UsersInThisRoom}
            />

            </div>
            );
        }
}