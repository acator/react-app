import { errorHandlerReducer, actionsErrors} from "../errorHandlerReducer"


let initialState = {
    errorLoadingUsers:null,
    errorLoadingFriends: null,
    errorLoadingPage: null,
    errorLoadingAuth: null,
    sendingError:null
    
}
it('the error has come up', () => {
    let state = initialState
    let action = actionsErrors.errorLoadingUsers("Ошибка всплыла")
    let newState = errorHandlerReducer(state, action)
    expect(newState.errorLoadingUsers).toBe("Ошибка всплыла")
})
it('the error has come up', () => {
    let state = initialState
    let action = actionsErrors.errorLoadingFriends("Ошибка всплыла")
    let newState = errorHandlerReducer(state, action)
    expect(newState.errorLoadingFriends).toBe("Ошибка всплыла")
})
it('the error has come up', () => {
    let state = initialState
    let action = actionsErrors.errorLoadingPage("Ошибка всплыла")
    let newState = errorHandlerReducer(state, action)
    expect(newState.errorLoadingPage).toBe("Ошибка всплыла")
})
it('the error has come up', () => {
    let state = initialState
    let action = actionsErrors.errorLoadingAuth("Ошибка всплыла")
    let newState = errorHandlerReducer(state, action)
    expect(newState.errorLoadingAuth).toBe("Ошибка всплыла")
})
it('the error sending', () => {
    let state = initialState
    let action = actionsErrors.sendingError("Ошибка отправки")
    let newState = errorHandlerReducer(state, action)
    expect(newState.sendingError).toBe("Ошибка отправки")
})