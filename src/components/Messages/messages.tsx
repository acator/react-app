import React, {  useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { subscribeChatMessages, unSubscribeChatMessages } from "../../Redux/chatReducser"
import { messages } from "../../Redux/selectors/messges"
import CreateMessage from "./createMessage"
import Dialogs from "./dialogs"
import DialogsWithSomebody from "./dialogsWithSombody"
import './messages.css'


export type Message = {
    message: string
    photo: string
    userId: number
    userName: string
}
const Messages:React.FC = (props) => {
   let dispatch = useDispatch()
    useEffect(() =>  {
    
        dispatch(subscribeChatMessages())
         return () =>{
            dispatch( unSubscribeChatMessages())
         }

       
    }, [])
  
    

  const message = useSelector(messages.getMessagesChat)
  const people = useSelector(messages.getMessagesPeople)
  const status = useSelector(messages.getMessagesChatStatus)
  const [isScroll, setScroll] = useState(true)
  const autoScrollRef = useRef<HTMLDivElement>(null)
  
    const autoScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>)=> {
       
         const element = e.currentTarget
         if(Math.abs((element.scrollHeight - element.scrollTop)- element.clientHeight) < 300){
            
             !isScroll && setScroll(true)
         }else{
         
             isScroll && setScroll(false)
         }
    }

 
  useEffect(()=> {
      if (isScroll && (autoScrollRef.current !== null )) {
          autoScrollRef.current.scrollIntoView({ behavior: "smooth" })
      }
     
  }, [message])
    return (
        
        <div className="our_messages">
            {status === "error" && <div>Error of loading, please refresh the page</div>}
            <h1>Our messages</h1>
            <div className="container_messages">
                <div className="dialogs">
                    <h3>Dialogs</h3>
                    <div>
                        {people.map((p) => <NavLink to={"/messages/" + p.id} >
                            <Dialogs key={p.id} names={p.people} />
                        </NavLink>)}
                    </div>
                </div>
                <div className="correspondence">
                    <h3>Correspondence</h3>

                    <div className='all_messages' >
                        {message.map((m) => <DialogsWithSomebody key={m.id}
                            message={m} />)}
                        <div ref={autoScrollRef} onScroll={autoScroll}></div>
                    </div>
                    <CreateMessage dis={status === 'pending' }  />
                </div>
            </div>
        </div>
    )
}

export default Messages; 