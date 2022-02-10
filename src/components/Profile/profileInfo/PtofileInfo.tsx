import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AboutMeType, contactsType, photosType, profileType,  thunkCreatorProfilePhoto } from '../../../Redux/profileReduser'
import { error } from '../../../Redux/selectors/error'
import { isAuth } from '../../../Redux/selectors/isAuth'
import { profile} from '../../../Redux/selectors/profile'
import Loading from '../../common/loading/loading'
import Modal from '../../common/Modal/modal'
import Notification from '../../common/notification/notification'

import userPhoto from './../photo/kisspng-real-estate-profile-picture-icon-5b4c113630d846.1237228215317117982001 (2).png'
import AboutMe from './aboutMe'
import Contacts from './contacts'
import ProfileStatus from './profileStatus'
interface Props  {
    isOur: boolean 
    contacts: contactsType | null
}
const ProfileInfo = (props: Props) => { 

    let [hideAboutMe, setHideAboutMe] = useState(false)
    let [hideContacts, setHideContacts] = useState(false)
    const auth = useSelector(isAuth.getIsAuth)
    const about = useSelector(profile.getAboutMe)
    const errorNotification = useSelector(error.sendingError)
    const status = useSelector(profile.getStatus)
    const profil = useSelector(profile.getProfile)
    const dispatch = useDispatch()
    let setPhoto = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length) {
          
            dispatch(thunkCreatorProfilePhoto(e.currentTarget.value))
        }
    }

    if (profil === null ){ return <Loading /> }else{  return (
        
        <div className="profile_info">
          
            <div className="photo_profile">
                {errorNotification &&
                    <Notification>{errorNotification}</Notification>
                }
                {
                    <img src={profil.photos?.large !== null ? profil.photos?.large : userPhoto }/>
                }
                {props.isOur &&
                    <div>
                        <input type="file" onChange={setPhoto} />
                    </div>
                }
            </div>
            <div className="profile_information">
                <div className="userName">{profil.fullName}</div>
                <div className="status">
                    <ProfileStatus isOur={props.isOur}
                        isAuth={auth}
                        status={status}
                         />
                </div>
                <div className="about_me">
                    <button onClick={() => setHideAboutMe(true)}>Обо мне</button>
                </div>
                <div className="my_contacts">
                    <button onClick={() => setHideContacts(true)} >Мои контакты</button>
                </div>
                {props.isOur && <NavLink to='./edit'>Edit</NavLink>}
                {hideAboutMe &&
                    <Modal>
                        <AboutMe 
                           
                            
                            aboutMe={about}
                            setHideAboutMe={() => { setHideAboutMe(false) }} />
                    </Modal>
                }
                {hideContacts &&
                    <Modal>
                        <Contacts isOur={props.isOur}
                            contacts={props.contacts}
                            setHideContacts={() => { setHideContacts(false) }} />
                    </Modal>
                }
            </div>
        </div>
    )
            }
}


export default ProfileInfo 

