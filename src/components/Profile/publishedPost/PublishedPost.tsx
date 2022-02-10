import React from "react"
//@ts-ignore
import userPhoto from './../photo/kisspng-real-estate-profile-picture-icon-5b4c113630d846.1237228215317117982001 (2).png'
interface Props {
    name: string | null
    text: string | null
}
const PublishedPost = ({ name, text}:Props) => {
    
    return(
        <div className="myPosts">
            <div className="block_post">
                <div className='person'>
                    <div className="photo_of_master"><img src={userPhoto} /></div>
                    <div className="name_person">{name}</div>
                </div>
                <div className="text_of_posts">{text}</div>
            </div>
        </div>
    )
}
export default PublishedPost