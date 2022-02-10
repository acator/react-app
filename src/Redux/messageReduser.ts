import {InferActionTypes }from './storeRedux'

export type messagesType ={
    id: string 
    message: string 
}
export type messagesPeopleType = {
    id: string
    people: string 
}
export type actionType = InferActionTypes<typeof actionCreator >
type initialStateType = {
    messages: Array<messagesType>
    messagesPeople: Array<messagesPeopleType>
}
let initialState: initialStateType  = {

    messages: [
        { id: "1", message: "Привет" },
        { id: "2", message: "Привет" },
        { id: "3", message: "Всем пока" }
    ],
    messagesPeople:[
        { id: "1", people: "Андрей" },
        { id: "2", people: "Артем" },
        { id: "3", people: "Александр" },
        { id: "4", people: "Алексей" },
        { id: "5", people: "Антон" },
        { id: "6", people: "Анатолий" },

    ]
}

const messageReducer = (state = initialState, action: actionType): initialStateType => {
    switch (action.type) {
        case "SET_MESSAGE_TEXT":
            return {
                ...state,
                messages: [...state.messages, {
                    id: "3",
                    message: action.text
                }
                ]

            }
        default:
            return state;
    }
}
export const actionCreator = {
    setTextMessages: (text: string ) => ({ type: "SET_MESSAGE_TEXT", text } as const)
}


 
 export default messageReducer
