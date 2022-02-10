import { apiGet } from "../../DAL/api"
import { LoginType } from "../../DAL/typeRequest"
import { actionsUsers, thunkCreatorFollow,  thunkCreatorUnFollow } from "../usersReduser"

jest.mock("../../DAL/api")
const apiMock  = apiGet as jest.Mocked<typeof apiGet>
let result: LoginType = {
    data: {
        userId: 1
    },
    resultCode: 0,
    messages: []

}
let dispatch = jest.fn()
let getStateMock = jest.fn()

beforeEach(() => {
    dispatch.mockClear()
    getStateMock.mockClear()
    apiMock.follow.mockClear()
    apiMock.unfollow.mockClear()

})

apiMock.follow.mockReturnValue(Promise.resolve(result))
apiMock.unfollow.mockReturnValue(Promise.resolve(result))


test("hjji", async () => {
   let thunk =  thunkCreatorFollow(1)
  
    await thunk(dispatch, getStateMock, {})
    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, actionsUsers.following(true, 1) )
    expect(dispatch).toHaveBeenNthCalledWith(3, actionsUsers.following(false, 1))

})
test("bgj", async () => {
    let thunk = thunkCreatorUnFollow(1)

    await thunk(dispatch, getStateMock, {})
    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1, actionsUsers.following(true, 1))
    expect(dispatch).toHaveBeenNthCalledWith(3, actionsUsers.following(false, 1))

})