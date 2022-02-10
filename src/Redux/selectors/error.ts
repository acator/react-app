import { AppReducerType } from "../storeRedux"

export const error = {

    sendingError(state: AppReducerType) {
        return state.error.sendingError
    },
    errorLoadingUsers(state: AppReducerType) {
        return state.error.errorLoadingUsers
    },
    errorLoadingPage(state: AppReducerType) {
        return state.error.errorLoadingPage
    }
 

}