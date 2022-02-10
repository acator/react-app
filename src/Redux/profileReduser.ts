import { FormAction, stopSubmit } from "redux-form";
import { apiGet } from "../DAL/api";
import { LoginType, ResultCode } from "../DAL/typeRequest";
import { thunkErrorLoadingPage, thunkSendingError } from "./errorHandlerReducer";
import { InferActionTypes, ThunkType } from "./storeRedux";

 
export type postsType = {
    id: string | null
    names: string | null
    textPost: string | null
}
export type contactsType = {
    [k: string]: string | null;
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
 export type photosType ={
    small: string | null
    large: string | null
}
export type profileType ={
    photos: photosType | undefined
    userIds: number | null 
    lookingForAJob: boolean
    lookingForAJobDescription: string | null 
    fullName: string | null 
    contacts: contactsType | null 
    aboutMe: string | null
    
}
export type AboutMeType = {
    [k: string]: string | boolean | null

    fullName:  string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    aboutMe: string | null
}
type initialStateType = {
    posts: Array<postsType>
    profile: profileType | null
    status: string | null
    isFetching: boolean 
    aboutMe: AboutMeType | null
    contacts: contactsType | null
}

let initialState: initialStateType = {
    posts: [
        { id: "1", names: "Павел", textPost: "Привет всем" },
        { id: "2", names: "Павел", textPost: "Привет всем, еще раз" },
        { id: "3", names: "Павел", textPost: "Всем пока" }
    ],
    profile: null,
    status: null,
    isFetching: false,
    aboutMe: null,
    contacts: null


}
type ActionType = InferActionTypes<typeof actionsProfile>

export  const profileReducer = (state = initialState, action: ActionType): initialStateType  => {
    switch (action.type) {

        case "SET_POST_TEXT":
            return {
                ...state,
                posts: [...state.posts, {
                    id: "3",
                    names: "Павел",
                    textPost: action.text
                }
                ]

            }
        case "SET_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "GET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "ABOUT_ME":
            return {
                ...state,
                aboutMe: {
                    fullName: action.info.fullName,
                    lookingForAJob: action.info.lookingForAJob,
                    lookingForAJobDescription: action.info.lookingForAJobDescription,
                    aboutMe: action.info.aboutMe
                },
                contacts:  action.info.contacts 
            }
        case "SET_PHOTO":
            return {
                ...state,
                
                profile:  {...state.profile! , photos : action.photos }

            }
        default:
            return state;

    }

}
export const actionsProfile = {
setTextPost : (text: string) => ({ type: "SET_POST_TEXT", text } as const),

    setProfile: (profile: profileType) => ({ type: "SET_PROFILE", profile } as const),

    toggleFetching: (isFetching: boolean) => ({ type: "IS_FETCHING", isFetching } as const),

    getStatus: (status: string) => ({ type: "GET_STATUS", status } as const),

    aboutMe: (info: profileType) => ({ type: "ABOUT_ME", info } as const),

    setPhoto: (photos: photosType | undefined) => ({ type: "SET_PHOTO", photos } as const)

}
export const thunkCreatorProfile: ThunkActionType = (userId: number | null) => async(dispatch) => {
    try{
        dispatch(actionsProfile.toggleFetching(true))
   let data = await apiGet.getProfile(userId)
        dispatch(actionsProfile.setProfile(data.data))
        dispatch(actionsProfile.aboutMe(data.data))
        dispatch(actionsProfile.toggleFetching(false))
   

    }catch(error){
        dispatch(thunkErrorLoadingPage())
    }
}
export const thunkCreatorProfileStatus: ThunkActionType = (userId: number) => async (dispatch) => {
    dispatch(actionsProfile.toggleFetching(true))
  let data = await  apiGet.getStatus(userId)
    dispatch(actionsProfile.getStatus(data.data.status))
    dispatch(actionsProfile.toggleFetching(false))

    
    
}
export const thunkCreatorProfilePhoto: ThunkActionType = (photo: string) => async (dispatch) => {
    try{
    let data = await apiGet.putPhoto(photo)
       
        if (data.data.resultCode === ResultCode.Success) {
            dispatch(actionsProfile.setPhoto(data.data.data))
        }

}catch(error){
    dispatch(thunkSendingError())
}
}
export const thunkCreatorProfileSetStatus: ThunkActionTypeNumUnStatus = (text: string) => async (dispatch: any) => {
    try{
    dispatch(actionsProfile.toggleFetching(true))
    let {data} = await apiGet.setStatus(text)
    if (data.resultCode === ResultCode.Success) {
        thunkCreatorProfileStatus(dispatch(actionsProfile.getStatus(text)))
        dispatch(actionsProfile.toggleFetching(false))
    } else {
        dispatch(stopSubmit('status', { _error: `${data.messages.length > 0 ? data.messages[0] : undefined}` }))
    }
    return data
}catch(error){
        dispatch(thunkSendingError())
}
}

export const thunkCreatorProfileInfo: ThunkActionTypeNumUnStatusUn = (formInfo: any) => {
    return async (dispatch, getState) => {
        try{
        const userId = getState().auth.id;
            dispatch(actionsProfile.toggleFetching(true))
        let data = await apiGet.setProfileInfo(formInfo)
            if (data.data.resultCode === ResultCode.Success) {
            dispatch(thunkCreatorProfile(userId))
                dispatch(actionsProfile.toggleFetching(false))
        } else {
            
            dispatch(stopSubmit('info', 
            { _error: `${data.data.messages.length > 0 ? data.data.messages[0] : undefined}` }))
        }
            return data.data
    }catch(error){
            dispatch(thunkSendingError())
    }
       
    }
}

export type ThunkActionType = ThunkType<ActionType, Promise<void>>
export type ThunkActionTypeNumUn = ThunkType<ActionType , Promise<number | undefined>>
export type ThunkActionTypeNumUnStatus = ThunkType<ActionType, Promise<LoginType | undefined>>
export type ThunkActionTypeNumUnStatusUn = ThunkType<ActionType | FormAction, Promise<LoginType | undefined>>

 
