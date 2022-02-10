import { AppReducerType } from "../storeRedux"

export const profile = {
    getPost(state: AppReducerType){
        return state.profile.posts
    },
    getProfile(state: AppReducerType) {
        return state.profile.profile
    },
    getStatus(state: AppReducerType) {
        return state.profile.status
    },
    getIsFetching(state: AppReducerType) {
        return state.profile.isFetching
    },
    getAboutMe(state: AppReducerType) {
        return state.profile.aboutMe
    },
    getContacts(state: AppReducerType) {
        return state.profile.contacts
    }
}