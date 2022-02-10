import {profileReducer,  actionsProfile} from "../profileReduser";


let initialState = {
    posts: [
        { id: "1", names: "Павел", textPost: "Привет всем" },
        { id: "2", names: "Павел", textPost: "Привет всем, еще раз" },
        { id: "3", names: "Павел", textPost: "Всем пока" }
    ],
    profile: null,
    status: null,
    isFetching: false,
    aboutMe: null,
    contacts: null


}
it('length of postText', () => {
    let state = initialState;
    let action = actionsProfile.setTextPost("Привет");
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4)
})
it('text of postText', () => {
    let state = initialState;
    let action = actionsProfile.setTextPost("Привет");
    let newState = profileReducer(state, action);
    expect(newState.posts[3].textPost).toBe("Привет")
})

it('toggle is Fetching', () => {
    let state = initialState;
    let action = actionsProfile.toggleFetching(true);
    let newState = profileReducer(state, action);
    expect(newState.isFetching).toBe(true)
})

it('getting of status', () => {
    let state = initialState;
    let action = actionsProfile.getStatus("anything phrase");
    let newState = profileReducer(state, action);
    expect(newState.status).not.toBeNull()
    expect(newState.status).toBe("anything phrase")

})




 
