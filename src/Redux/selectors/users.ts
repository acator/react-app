import { AppReducerType } from "../storeRedux"


export const users = {
    getUsers(state: AppReducerType) {
        return state.users.users
    },
    getTotalCount(state: AppReducerType) {
        return state.users.totalCount
    },
    getPageNumber(state: AppReducerType) {
        return state.users.pageNumber
    },
    getCount(state: AppReducerType) {
        return state.users.count
    },
    getFollowing(state: AppReducerType) {
        return state.users.following
    },
   
    filter(state: AppReducerType){
        return state.users.filter
    }
} 