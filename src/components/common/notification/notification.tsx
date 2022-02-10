import React from "react";
import './notification.css';

interface Props {
    children:React.ReactNode
}
const Notification: React.FC<Props> = (props) => {
   return (
       <div className = "notification"> 
           {props.children}
       </div>
   )
}
export default Notification