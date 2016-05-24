import React from 'react';

export default class ClubDiscounts extends React.Component{
render(){
        const self = this;
          if(self.props.current_room){
            return(
              <div>
                <button onClick={self.props.ShowDiscounts} className="btn btn-block btn-warning">Exit Room</button>
              </div>  
                );
          }  
            return(
                 <div></div>
                );
    }
}