import React from 'react'
import { NavLink } from 'react-router-dom'
import { Message } from './messages'
//@ts-ignore
import userPhoto from './photo/kisspng-real-estate-profile-picture-icon-5b4c113630d846.1237228215317117982001 (2).png'

type Props ={
    message: Message
}
const DialogsWithSomebody: React.FC<Props> = (props) => {
   
    return <div className="message">
                <img src={props.message.photo || userPhoto} />
        <NavLink to={`profile/${props.message.userId}`}><span>{props.message.userName}</span></NavLink>
                <div className="our_messsges">{props.message.message}</div>
            </div>

}
export default DialogsWithSomebody

