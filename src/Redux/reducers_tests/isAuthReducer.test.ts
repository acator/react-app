import isAuthReducer, { actionsAuth } from "../isAuthReducer"

 
let initialState = {
    id: null,
    initial: false,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
}

it('initialization was successful', () => {
    let action = actionsAuth.initial(true)
    let state = initialState
    let newState = isAuthReducer(state, action)
    expect(newState.initial).toBe(true)
})
it('login was successful', () => {
    let action = actionsAuth.authMe(12, "sablina.dasha2017@yandex.ru", "sablina.dasha2017@yandex.ru", true)
    let state = initialState
    let newState = isAuthReducer(state, action)
    expect(newState.id).toBe(12)
    expect(newState.email).toBe("sablina.dasha2017@yandex.ru")
    expect(newState.login).toBe("sablina.dasha2017@yandex.ru")
    expect(newState.isAuth).toBe(true)

})
it('captcha was got', () => {
    let action = actionsAuth.captcha('img/djfkdjk/jsdjj')
    let state = initialState
    let newState = isAuthReducer(state, action)
    expect(newState.captcha).toBe('img/djfkdjk/jsdjj')
})
