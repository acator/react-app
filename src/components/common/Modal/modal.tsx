import React from 'react'
import './modal.css'
interface Props  {
    children: React.ReactNode
}

const Modal: React.FC<Props> = (props) => {
    return (
        <div className="modal_window">
            <div className="background"></div>
            <div className="modal">{props.children}</div>
        </div>
    )
}

export default Modal