import React from "react"
import withAuthRedirect from "../HOC/withAuthRedirect"
import Messages from "./messages"
import './messages.css'

const MessagesContainer: React.FC = ()=> {

    return (
        <Messages />
    )
    
}





const HightComponentMessages = withAuthRedirect(MessagesContainer)
export default HightComponentMessages as unknown as React.ComponentType