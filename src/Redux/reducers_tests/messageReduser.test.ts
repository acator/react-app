import messageReducer, { actionCreator } from "../messageReduser"



let initialState = {

    messages: [
        { id: "1", message: "Привет" },
        { id: "2", message: "Привет" },
        { id: "3", message: "Всем пока" }
    ],
    messagesPeople: [
        { id: "1", people: "Андрей" },
        { id: "2", people: "Артем" },
        { id: "3", people: "Александр" },
        { id: "4", people: "Алексей" },
        { id: "5", people: "Антон" },
        { id: "6", people: "Анатолий" },

    ]
}

 it("length array of messages", () => {
     let state = initialState
     let action = actionCreator.setTextMessages("Здарова")
     let newState = messageReducer(state, action)
     expect(newState.messages.length).toBe(4)
 })
it("text of messages", () => {
    let state = initialState
    let action = actionCreator.setTextMessages("Здарова")
    let newState = messageReducer(state, action)
    expect(newState.messages[3].message).toBe("Здарова")
})
