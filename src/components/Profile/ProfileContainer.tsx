import React, { useEffect } from "react"
import './profile.css'
import Profile from "./Profile"
import { 
       thunkCreatorProfile,
       thunkCreatorProfileStatus, 
        } from "../../Redux/profileReduser"
import { RouteComponentProps, useParams, useHistory } from "react-router-dom"
import { isAuth } from "../../Redux/selectors/isAuth"
import Loading from "../common/loading/loading"
import WithAuthRedirect from "../HOC/withAuthRedirect"
import { profile } from "../../Redux/selectors/profile"
import Error from "../common/Error/error"
import {  useDispatch, useSelector } from "react-redux"
import { error } from "../../Redux/selectors/error"





type RoutProps = {
    userId: string | undefined
}
type Route = RouteComponentProps<RoutProps> 
const ProfileContainer: React.FC<Route> =()=> {
    const errorLoading = useSelector(error.errorLoadingPage)
    const profiles = useSelector(profile.getProfile)
    const contacts = useSelector(profile.getContacts)
    const id   = useSelector(isAuth.getId)
    const isFetching = useSelector(profile.getIsFetching)
    const posts = useSelector(profile.getPost)
    const params: RoutProps = useParams() as  RoutProps
    const dispatch = useDispatch()
    
   
    
    const refresh = () => {
       
            let userId = null
            if (params.userId !== undefined){
                userId = params.userId
            }else{
                userId = id
            }

        
        dispatch(thunkCreatorProfile(userId ))
        dispatch(thunkCreatorProfileStatus(userId))
        
    }
    useEffect(() => {
        refresh()
      
    }, [params])
  
    if (isFetching === true && profile === null) {
        return <Loading />
    }
    return(
        errorLoading || !profiles ? <Error globalError={errorLoading} /> : <Profile
            isOur={!params.userId}
            contacts={contacts}
            posts={posts} 
            />
    )

}




const HightComponentProfile = WithAuthRedirect(ProfileContainer) as unknown as React.ComponentType
export default HightComponentProfile as unknown as React.ComponentType