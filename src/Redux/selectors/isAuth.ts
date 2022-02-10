import { AppReducerType } from "../storeRedux"

export const isAuth = {
    
    getId(state: AppReducerType){
        return state.auth.id
    },
    getIsAuth(state: AppReducerType) {
        return state.auth.isAuth
    },
    
    getInitial(state: AppReducerType) {
        return state.auth.initial
    },
    getCaptcha(state: AppReducerType) {
        return state.auth.captcha
    }

}