import React from 'react';
import EachUser from './EachUser';

export default class ShowUsers extends React.Component{
    render(){
        let ShowAllUsers;
        if (this.props.room && this.props.UsersInThisRoom){
              ShowAllUsers = this.props.UsersInThisRoom.map( function(user){
                return(<EachUser ref="user" key={user} user={user}/>);
            });
             return(
            <ul className="list-group">
            <h2>Users In {this.props.room}</h2>
            {ShowAllUsers}
            </ul>
        );  
        }
        if(this.props.UsersConnected){
            ShowAllUsers = this.props.UsersConnected.map( function(user){
                return(<EachUser key={user} user={user}/>);
            }) ;  
        } 
        return(   
            <ul className="list-group">
            <h2>Users Online</h2>
            {ShowAllUsers}
            </ul>
            );
    }
}