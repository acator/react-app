import React from 'react'
import './error.css'
import { connect } from 'react-redux'

interface Props {
    globalError?: string | null
}
const Error: React.FC<Props> = (props: Props) => {
    return(
        <div className="error_page">
            {props.globalError &&
             <div>{props.globalError}</div>
            }
            {!props.globalError &&
            <>
            <h1>Ошибка 404,</h1>
            <h2>страница не найдена</h2>
            </>
}
        </div>
    )
}

export default Error 