import { Dispatch } from "redux"
import { apiChat, messages, statusType } from "../DAL/api-chat"
import { InferActionTypes, ThunkType } from "./storeRedux"
import { v1 } from 'uuid'

type Id = {
    id: string
}

type initialChat = {
    messages: Array<messages & Id>
    status: statusType
}
let initialState: initialChat = {
    messages: [],
    status: "pending"
}
type ActionType = InferActionTypes<typeof actionsAuth>
const chatReducer = (state = initialState, action: ActionType): initialChat => {
    switch (action.type) {
        case "CHAT_MESSAGES":
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map(m => ({ ...m, id: v1() }))]
                    .filter((e, index, array) => index >= array.length - 100)
            }
        case "CHAT_STATUS":
            return {
                ...state,
                status: action.status
            }


        default:
            return state;
    }

}
export const actionsAuth = {
    messageAction: (messages: messages[]) => ({ type: "CHAT_MESSAGES", messages } as const),
    statusAction: (status: statusType) => ({ type: "CHAT_STATUS", status } as const),


}
export type ThunkActionType = ThunkType<ActionType>

let newMessageHandler: ((messages: messages[]) => void) | null = null
let newStatusHandler: ((status: statusType) => void) | null = null

let newMessageHandlerCreator = (dispatch: Dispatch) => {

    if (newMessageHandler === null) {

        newMessageHandler = (messages: messages[]) => {
            dispatch(actionsAuth.messageAction(messages))
        }
    }
    return newMessageHandler
}
let newStatusHandlerCreator = (dispatch: Dispatch) => {

    if (newStatusHandler === null) {

        newStatusHandler = (status: statusType) => {
            dispatch(actionsAuth.statusAction(status))
        }
    }
    return newStatusHandler
}

export const subscribeChatMessages: ThunkActionType = () => async (dispatch: Dispatch) => {

    apiChat.start()
    apiChat.subscribe("subscriber-messages", newMessageHandlerCreator(dispatch))
    apiChat.subscribe("subscriber-statusSend", newStatusHandlerCreator(dispatch))
}

export const unSubscribeChatMessages: ThunkActionType = () => {
    return async (dispatch) => {
        apiChat.stop()
        apiChat.unsubcribe("subscriber-messages", newMessageHandlerCreator(dispatch))
        apiChat.unsubcribe("subscriber-statusSend", newStatusHandlerCreator(dispatch))

    }
}
export const sendChatMessages: ThunkActionType = (text) => {
    return async () => {
        apiChat.send(text)
    }
}



export default chatReducer