import React, { useEffect } from "react"
import "./users.css"
import Users from "./Users"
import {  useDispatch, useSelector } from "react-redux"
import { thunkCreatorGetUsers, 
     filterUsers
    } from './../../Redux/usersReduser'
import Loading from "../common/loading/loading"
import { NavLink, useHistory } from "react-router-dom"
import  UserSetter  from "./userSetter"
import { profile } from "../../Redux/selectors/profile"
import { users } from "../../Redux/selectors/users"
import { error } from "../../Redux/selectors/error"
import { isAuth } from "../../Redux/selectors/isAuth"
import Notification from "../common/notification/notification"
import SearchingUsers from "./searchUsers"

const UsersPage: React.FC = () => {
    const dispatch = useDispatch() 
   
    const count = useSelector(users.getCount)
    const filter = useSelector(users.filter)
    const errorLoading = useSelector(error.errorLoadingUsers)
    const errorNotification = useSelector(error.sendingError)
    const totalCount = useSelector(users.getTotalCount)
    const pageNumber = useSelector(users.getPageNumber)
    const auth = useSelector(isAuth.getIsAuth)
    const user = useSelector(users.getUsers)
    const isFetching = useSelector(profile.getIsFetching)
    const history = useHistory()
     
    type Parse = {
        page: string 
        term: string 
        friend: "null" | "true" | "false"
    }
   
    useEffect(() => {
       
        const querystring = require('querystring')
        const  search  = history.location.search.substring(1)
       
        const query = querystring.parse(search) as Parse
        let pagNumberParse = query.page || pageNumber
        let termParse = query.term || filter.term
        let friendParse = filter
        
            switch (query.friend){
                case "true":
                 
                        friendParse = {...friendParse, friend: "true"}
                    break
                case "false":
                    friendParse = { ...friendParse, friend: "false" }
                    break
                case "null":
                    friendParse = { ...friendParse, friend: "null" }
                    break
                   
            
            }
        
    

        console.log(query)
        dispatch(thunkCreatorGetUsers(count, pagNumberParse, termParse, friendParse.friend))
        

    }, [])

    useEffect(() => {

        history.push({
            pathname: "/all_users",
            search: `?page=${pageNumber}&term=${filter.term || null}&friend=${filter.friend}`
        })
        console.log(pageNumber)
    }, [filter, pageNumber])
    
   

    const setUser =(pageNumber: number | null) =>  {
       dispatch(thunkCreatorGetUsers(count, pageNumber, filter.term, filter.friend))
    }
    const setUserSearch = (pageNumber: number | null, term: string, friend: filterUsers["friend"])  => {
        dispatch(thunkCreatorGetUsers(count, pageNumber, term, friend))
    }
    return(
        <>
            {
                errorNotification &&
                <Notification>{errorNotification}</Notification>
            }
            <SearchingUsers setUserSearch={setUserSearch}
                errorLoading={errorLoading}
                totalCount={totalCount}
                count={count}
                pageNumber={pageNumber} />
            <NavLink className="users-friends"
                to='/all_users'>All Users</NavLink>
            {auth &&
                <NavLink className="users-friends"
                    to='/friends'>My Friends</NavLink>
            }

            {
                isFetching ? <Loading /> : <Users  setUser={setUser} >
                    <UserSetter peoples={user} />
                </Users>
            }
        </>
    )
}

export default UsersPage