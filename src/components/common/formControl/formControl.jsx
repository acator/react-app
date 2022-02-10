import React  from 'react'
import './formControl.css'

export  const Input = ({meta, input, ...props}) => {
    return (
        <div>
            <input 
            {...input} 
            {...props}
             className={meta.error && 'error_input'} />
            {meta.error && <div className="error">{meta.error}</div>}

        </div>
    )
}

export const InputStatus = ({input, ...props}) => {
    return(
        <>
            <input {...input} 
            {...props} />
            {props.error && <div className="error">{props.error}</div>}
        </>
    )
}