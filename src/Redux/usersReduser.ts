import { apiGet} from "../DAL/api";
import { photosType, actionsProfile  } from "./profileReduser";
import halper from "./Halper/halper";
import { thunkErrorLoadingUsers, thunkSendingError } from "./errorHandlerReducer";
import {  InferActionTypes, ThunkType } from "./storeRedux";
import { ResultCode } from "../DAL/typeRequest";



export type userInfo ={
    id: number 
    name: string | null
    status: string | null
    photos: photosType
    followed: boolean
}
export type initialStateType = {
    users: Array<userInfo> | null,
    totalCount: null | number,
    pageNumber: null | number,
    count: 20,
    following: boolean,
  
    filter: filterUsers
}
export type filterUsers = {
       term: string
       friend: "null" | "true" | "false"
}
 export let initialState: initialStateType = {
    users: null,
    totalCount: null,
    pageNumber: null,
    count: 20,
    following: false,
   
    filter: {
        term: "", 
        friend: "null"
    }
}
type actionsType = InferActionTypes<typeof actionsUsers | typeof actionsProfile>

const usersReducer = (state = initialState, action: actionsType): initialStateType => {
    switch (action.type) {

        case "GET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "PAGE_NUMBER":
            return {
                ...state,
                pageNumber: action.pageNumber
            }
        case "GET_TOTAL_COUNT":
            return {
                ...state,
                totalCount: action.totalCount
            }
        case "FOLLOW":
            return {
                ...state,
                users: halper(state.users, action.userId, { followed: true })
            }
        case "UN_FOLLOW":
            return {
                ...state,
                users: halper(state.users, action.userId, { followed: false })
            }
        case "FOLLOWING":
            return {
                ...state,
                following: action.bool
            }
        
        case "FILTER_USERS":
            return {
           ...state, filter: action.filter
        }
        default: {
            return state;
        }
    }
}
export const actionsUsers = {
    getUsers : (users: Array<userInfo> | null) => ({ type: "GET_USERS", users } as const),

 setPageNumberCount : (pageNumber: number | null) => ({ type: "PAGE_NUMBER", pageNumber } as const),

 getTotalUsers : (totalCount: number | null) => ({ type: "GET_TOTAL_COUNT", totalCount } as const),

 follow : (userId: number | null) => ({ type: "FOLLOW", userId } as const),

 unfollow : (userId: number | null) => ({ type: "UN_FOLLOW", userId } as const),

 following : (bool: boolean, userId: number | null) => ({ type: "FOLLOWING", bool, userId } as const),

 friend : (friend: Array<userInfo> | null) => ({ type: "FRIEND", friend } as const),
    filter: (filter: filterUsers) => ({ type: "FILTER_USERS", filter } as const)
}

 
export type thunkActionType = ThunkType<actionsType>
export const thunkCreatorGetUsers: thunkActionType = (count: number | null, pageNumber: number | null, term: string, friend: filterUsers["friend"] ) => {
    return async (dispatch) => {
        try{
            dispatch(actionsProfile.toggleFetching(true))
            let data = await apiGet.getUser(count, pageNumber, term, friend)
            dispatch(actionsProfile.toggleFetching(false))
        dispatch(actionsUsers.getUsers(data.data.items))
            dispatch(actionsUsers.getTotalUsers(data.data.totalCount))
            dispatch(actionsUsers.filter({term, friend}))
            dispatch(actionsUsers.setPageNumberCount(pageNumber))

    }catch(error){
        dispatch(thunkErrorLoadingUsers())
    }
}
}




export const thunkCreatorFollow: thunkActionType = (userId: number) => {
    return async (dispatch) => {
        try{
            dispatch(actionsUsers.following(true, userId))
        let data = await apiGet.follow(userId)
            if (data.resultCode === ResultCode.Success) {
                dispatch(actionsUsers.follow(userId))
                dispatch(actionsUsers.following(false, userId))
        }
    
        }catch(error){
    dispatch(thunkSendingError())
            dispatch(actionsUsers.following(false, userId))

    }
 }
}
export const thunkCreatorUnFollow: thunkActionType = (userId: number) => {
    return async (dispatch) => {
        try{
            dispatch(actionsUsers.following(true, userId))
        let data = await apiGet.unfollow(userId)
            if (data.resultCode === ResultCode.Success) {
                dispatch(actionsUsers.unfollow(userId))
                dispatch(actionsUsers.following(false, userId))
           
        }
    }catch{
        dispatch(thunkSendingError())
            dispatch(actionsUsers.following(false, userId))

    }
    }
}

 
 export default usersReducer
