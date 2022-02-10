import React from "react"
import './profile.css'
import ProfileInfo from "./profileInfo/PtofileInfo"
import CreatePost from "./createPost/CreatePost"
import PublishedPost from "./publishedPost/PublishedPost"
import {  contactsType, postsType } from "../../Redux/profileReduser"

type Props = {
    isOur: boolean
    posts: Array<postsType> 
    contacts: contactsType | null
}
const Profile: React.FC<Props> = ({
    isOur,
    posts,
    contacts
  }:Props) => {

        
    return (
        <div>
            <h1>My profile</h1>
            <div className="profile_container">
                <ProfileInfo isOur={isOur} contacts={contacts}
                    />
                <div className="posts">
                    <CreatePost />
                    <h3>Мои посты</h3>
                    {posts.map((p) => <PublishedPost
                        key={p.id}
                        name={p.names}
                        text={p.textPost} />)}
                </div>
            </div>
        </div>
    )
}

export default Profile;