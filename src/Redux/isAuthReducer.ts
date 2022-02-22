import { FormAction, stopSubmit } from "redux-form"
import { apiGet } from "../DAL/api"
import { AuthMeType, ResultCode } from "../DAL/typeRequest"
import { thunkErrorLoadingAuth, thunkSendingError } from "./errorHandlerReducer"
import {  InferActionTypes, ThunkType } from "./storeRedux"



type typeState = {
    id: number | null ,
    isAuth:  boolean,
    initial: boolean,
    email: null | string,
    login: null | string,
    captcha?: null |string
}

let initialState: typeState = {
    id: null,
    isAuth: false,
    initial: false,
    email: null,
    login: null,
    captcha: null
}
type ActionType = InferActionTypes<typeof actionsAuth>
const isAuthReducer = (state = initialState, action: ActionType) : typeState => {
    switch (action.type) {
        case "IS_AUTH":
            return {
                ...state,
                id: action.id,
                email: action.email,
                login: action.login,
                isAuth: action.isAuth
            }

        case "INITIAL":
            return {
                ...state,
                initial: action.bool
            }
        case"CAPTCHA":
            return {
                ...state,
                captcha: action.captcha
            }
      

        default:
            return state;
    }

}
export const actionsAuth = {
    authMe: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: "IS_AUTH", id, email, login, isAuth } as const),

    initial : (bool: boolean) => ({ type: "INITIAL", bool } as const),

    captcha : (captcha: string | null) => ({ type: "CAPTCHA", captcha } as const)
}

export const thunkCreatorAuthMe: ThunkActionTypeUn = () => {
    return async (dispatch) => {
       
        try{
        let data = await apiGet.getAuthMe()
        if (data.data.resultCode === ResultCode.Success) {
            dispatch(actionsAuth.authMe(data.data.data.id, data.data.data.email, data.data.data.login, true))
            dispatch(actionsAuth.initial(true))

        } else if (data.data.resultCode === ResultCode.Error) {
            dispatch(actionsAuth.authMe(null, null, null, false))
            dispatch(actionsAuth.initial(true))
        }
        return data.data
    }catch(error){
         

       dispatch(thunkErrorLoadingAuth())
            dispatch(actionsAuth.initial(true))
    }
    }

}
export const captchaCreator: ThunkActionType = () => async (dispatch) => {

    let data = await apiGet.getCaptcha()
    dispatch(actionsAuth.captcha(data.data.url))

}
export const thunkCreatorLogin: ThunkActionForm = (email: string, password: string, rememberMe: Boolean, captcha?: string) => {
    return async (dispatch) => {
        try{
        let data = await apiGet.login(email, password, rememberMe = true, captcha! )
        if (data.data.resultCode === ResultCode.Success) {
            dispatch(thunkCreatorAuthMe())
        } else if (data.data.resultCode === ResultCode.Captcha) {
            dispatch(captchaCreator())
        } else if (data.data.resultCode === 1){
            dispatch(stopSubmit("login", {_error: `${data.data.messages}`}))
        }
    }catch(error){
        
        dispatch(thunkSendingError())

    }
}

}
export const thunkCreatorLogOut: ThunkActionType = () => {
    return async (dispatch) => {
        let data = await apiGet.logOut()
        if (data.data.resultCode === ResultCode.Success) {
            dispatch(actionsAuth.authMe(null, null, null, false))
        }
    }
}
export type ThunkActionType = ThunkType<ActionType>
export type ThunkActionForm = ThunkType< FormAction>
export type ThunkActionTypeUn = ThunkType<ActionType, Promise<AuthMeType | undefined>>

 
 export default isAuthReducer
