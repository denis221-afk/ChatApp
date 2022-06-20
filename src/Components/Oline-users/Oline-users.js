import React from "react";


const OnlineUsers = ({name, id, online}) => {
    return(
        <div className="box-container">
            
            <div className="box-item">
            <div className="avatar panel-avatar">
                <span>{name[0]}</span>
            </div>
                <div className="online-name">{name} <span>online</span></div>
            </div>
        </div>
 
    )
} 

export default OnlineUsers