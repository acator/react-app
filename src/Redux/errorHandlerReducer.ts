import { Dispatch } from "redux"
import { actionsProfile } from "./profileReduser"
import {  InferActionTypes, ThunkType } from "./storeRedux"


type initialStateType = {
    errorLoadingUsers: null | string,
    errorLoadingFriends: null | string,
    errorLoadingPage: null | string,
    errorLoadingAuth: null | string,
    sendingError: null | string
}
let initialState: initialStateType = {
    errorLoadingUsers:null,
    errorLoadingFriends: null,
    errorLoadingPage: null,
    errorLoadingAuth: null,
    sendingError:null
    
}
export type ActionTypes = InferActionTypes<typeof actionsErrors | typeof actionsProfile>
 
export const errorHandlerReducer = (state = initialState, action: any): initialStateType  => {
    switch (action.type) {
        case "ERROR_LOADING_USERS":
         return {
             ...state,
             errorLoadingUsers: action.error
         }
        case "SENDING_ERROR":
            return {
                ...state,
                sendingError: action.error
            }
        case "SENDING_ERROR_FRIENDS":
            return {
                ...state,
                errorLoadingFriends: action.error
            }
        case "SENDING_ERROR_PAGES":
            return {
                ...state,
                errorLoadingPage: action.error
            }
        case "SENDING_ERROR_AUTH":
            return {
                ...state,
                errorLoadingAuth: action.error
            }
        default:
           return state
    }
}
export const actionsErrors ={

    errorLoadingUsers : (error: string | null) => ({ type: "ERROR_LOADING_USERS", error } as const),

    sendingError : (error: string | null) => ({ type: "SENDING_ERROR", error } as const),

    errorLoadingFriends : (error: string | null) => ({ type: "SENDING_ERROR_FRIENDS", error } as const),

    errorLoadingPage : (error: string | null) => ({ type: "SENDING_ERROR_PAGES", error } as const),

    errorLoadingAuth : (error: string | null) => ({ type: "SENDING_ERROR_AUTH", error } as const)
}

const thankCreatorErrorConstructor = (func: (error: string | null) => any, dispatch: Dispatch<ActionTypes>)=> {
    dispatch(actionsProfile.toggleFetching(false))
    dispatch(func("Ошибка загрузки, пожалуйста перезагрузите страницу или повторите попытку позже"))
}
export const thunkErrorLoadingUsers: ThunkActionType = () => (dispatch) => { thankCreatorErrorConstructor(actionsErrors.errorLoadingUsers, dispatch)}
export const thunkErrorLoadingFriends: ThunkActionType = () => (dispatch) => { thankCreatorErrorConstructor(actionsErrors.errorLoadingFriends, dispatch)}
export const thunkErrorLoadingPage: ThunkActionType = () => (dispatch) => { thankCreatorErrorConstructor(actionsErrors.errorLoadingPage, dispatch)}
export const thunkErrorLoadingAuth: ThunkActionType = () => (dispatch) => { thankCreatorErrorConstructor(actionsErrors.errorLoadingAuth, dispatch)}

export const thunkSendingError:ThunkActionType = () => (dispatch) => {
    dispatch(actionsErrors.sendingError("Ошибка отправки"))
    setTimeout(() => {
        dispatch(actionsErrors.sendingError(null))
    }, 3000);
}
type ThunkActionType = ThunkType<ActionTypes, void>
