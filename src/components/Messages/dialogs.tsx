import React from 'react'
//@ts-ignore
import userPhoto from './photo/kisspng-real-estate-profile-picture-icon-5b4c113630d846.1237228215317117982001 (2).png'

type Props = {
    names: string
}
const Dialogs: React.FC<Props> = (props) =>{
    return (

        <>
            <div className="person_of_messages">
                <div className="photo_person_dialog">
                    <img src={userPhoto} />
                </div>
                <div className="name_person_dialog">{props.names}</div>
            </div>

        </>

    )
}
export default Dialogs