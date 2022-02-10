import React from 'react'
//@ts-ignore
import loading from './Loading/8.gif'
import './loading.css'

const Loading = () => {
    return (
        <div className="loading">
            <img src={loading} />
        </div>
    )
}
export default Loading

