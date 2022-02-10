import { Card, Col } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { thunkCreatorFollow, thunkCreatorUnFollow } from '../../Redux/usersReduser'
import Notification from '../common/notification/notification'
//@ts-ignore
import userPhoto from './photo/kisspng-real-estate-profile-picture-icon-5b4c113630d846.1237228215317117982001 (2).png'
interface Props{
    id:number
    photo:string | null
    name: string | null
    follow: boolean
    following:boolean
   
}
const BlockUsers: React.FC<Props> = ({ id, photo, name, follow, following}: Props) => {
   const dispatch = useDispatch()

    return (
        <Col>
        
           
            <Card title={name} bordered={false}>
               
          
            <NavLink to={'profile/' + id}>
                <div className="userPhoto" >
                    <img alt='user' src={photo || userPhoto} />
                </div>
                
            </NavLink>

            {!follow && <button disabled={following}
                onClick={() => { dispatch(thunkCreatorFollow(id)) }}>Follow</button>}
            {follow && <button disabled={following}
                onClick={() => { dispatch(thunkCreatorUnFollow(id)) }}>UnFollow</button>}
            </Card>
           
      
        </Col>
    )
}

export default BlockUsers;