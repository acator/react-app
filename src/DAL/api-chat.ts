

export type messages = {
    message: string
    photo: string
    userId: number
    userName: string
}

let subscribers = {
    "subscriber-messages": [] as CallBackSubscribersMessages[],
    "subscriber-statusSend": [] as CallBackSubscribersStatus[]
}

export type statusType = "error" | "pending" | "ready"

export type CallBackSubscribersMessages = (messages: messages[]) => void
export type CallBackSubscribersStatus = (status: statusType) => void

let switchInput = (value: statusType) => {
    subscribers["subscriber-statusSend"].forEach(s => s(value))
}
let closeCanal = () => {
    switchInput("pending")
    setTimeout(createCanal, 3000)
}
let listenerMessage = (e: MessageEvent) => {
    let message = JSON.parse(e.data)
    subscribers["subscriber-messages"].forEach(s => s(message));
}
let errorCanal = () => {
    switchInput("error")
}
let openCanal = () => {
    switchInput("ready")
}
let ws: WebSocket | null = null
let cleanUp = () => {
   
    ws?.removeEventListener("close", closeCanal)
    ws?.removeEventListener("message", listenerMessage)
    ws?.removeEventListener("error", errorCanal)
    ws?.removeEventListener("open", openCanal)
    

}
const createCanal = () => {
    
    ws?.close()
    
    cleanUp()
    ws =  new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('open', openCanal)
    ws.addEventListener('message', listenerMessage)
    ws.addEventListener('error', errorCanal)
    ws.addEventListener("close", closeCanal)
    

};
type eventType = "subscriber-messages" | "subscriber-statusSend"
export const apiChat = {
    start() {
        createCanal()

    },
    stop() {
        subscribers["subscriber-messages"] = []
        cleanUp()

    },
    subscribe(eventAction: eventType, callBack: CallBackSubscribersMessages | CallBackSubscribersStatus) {
        //@ts-ignore
        subscribers[eventAction].push(callBack)
        return () => {
            //@ts-ignore
            subscribers[eventAction] = subscribers[eventAction].filter(s => s !== callBack)
        }
    },
    unsubcribe(eventAction: eventType, callBack: CallBackSubscribersMessages | CallBackSubscribersStatus) {
        //@ts-ignore
        subscribers[eventAction] = subscribers[eventAction].filter(s => s !== callBack)


    },
    send(text: string) {
      
        ws?.send(text)
        
    }


} 