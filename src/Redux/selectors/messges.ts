import { AppReducerType } from "../storeRedux"

export const messages = {
    getMessages(state: AppReducerType){
        return state.messages.messages
    },
    getMessagesPeople(state: AppReducerType) {
        return state.messages.messagesPeople
    },
    getMessagesChat(state: AppReducerType) {
        return state.chat.messages
    },
     getMessagesChatStatus(state: AppReducerType) {
        return state.chat.status
    }

}