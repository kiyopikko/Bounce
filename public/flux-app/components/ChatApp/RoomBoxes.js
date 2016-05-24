import React from 'react';
import ShowUsers from './ShowUsers.js';
import Room from './Room.js';

export default class RoomBoxes extends React.Component{ 
render(){
        let allRoom = (<div> chekcing rooms. . .</div>);  
        const self = this;
        if (this.props.rooms){
            allRoom = self.props.rooms.map(function (room){
                if (room.room === self.props.current_room){
                    return (<Room key={room.host} room={room} user={self.props.user} current_room={true}/>
                        );
                }
                return(<Room key={room.host} room={room} user={self.props.user}/>);
            });
        }
        return (
            <div className="chatRooms">
            
            <div>
            <h2>Chat Rooms</h2>
            </div>
            
            <ul className="list-group">
            {allRoom}
            </ul>

            <ShowUsers 
            UsersConnected  = {this.props.UsersConnected} 
            room            = {this.props.current_room} 
            UsersInThisRoom = {this.props.UsersInThisRoom}/>

            </div>  
            );
    }
}