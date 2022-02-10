import usersReducer, { actionsUsers, filterUsers, initialState, initialStateType } from "../usersReduser";

let state: initialStateType 

beforeEach(() => {
     state = {
        users: [
            { id: 0, name: "andrea", status: "GHb", photos: {small: null, large: null}, followed: false },
            { id: 1, name: "andrea", status: "GHb", photos: { small: null, large: null }, followed: true },
            { id: 2, name: "andrea", status: "GHb", photos: { small: null, large: null }, followed: false },
            { id: 3, name: "andrea", status: "GHb", photos: { small: null, large: null }, followed: false },
        ],
        totalCount: null,
        pageNumber: null,
        count: 20,
        following: false,
       
         filter: {
             term: "",
             friend: "null"
         }
    }
}) 


test("followed success", () => {
    let action = actionsUsers.follow(2)
    let reduce = usersReducer(state, action)
    if (reduce.users !== null){
    expect(reduce.users[3].followed).toBeFalsy()
    expect(reduce.users[2].followed).toBeTruthy()
    }

})
 
test("followed success", () => {
    let action = actionsUsers.unfollow(1)
    let reduce = usersReducer(state, action)
    if (reduce.users !== null) {
    expect(reduce.users[1].followed).toBeFalsy()
    expect(reduce.users[2].followed).toBeFalsy()
    }
})
