import { Action, ActionCreator, applyMiddleware, combineReducers, compose, createStore } from "redux";
import { reducer as formReducer } from 'redux-form'
import messageReducer from "./messageReduser";
import usersReducer from "./usersReduser";
import thunkMiddleWare, { ThunkAction, ThunkDispatch } from "redux-thunk";
import isAuthReducer from "./isAuthReducer";
import { errorHandlerReducer } from "./errorHandlerReducer";
import { profileReducer } from "./profileReduser";
import chatReducer from './chatReducser'
const rootReducer = combineReducers({
    profile: profileReducer,
    form: formReducer,
    messages: messageReducer,
    users: usersReducer,
    auth: isAuthReducer,
    error: errorHandlerReducer,
    chat: chatReducer

})
type RootReducerType = typeof rootReducer
export type AppReducerType = ReturnType<RootReducerType>


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key : string ] :(...args: any[]) => any}> = ReturnType<PropertiesType<T>>
export type ThunkType<A extends Action, R = Promise<void>> = ActionCreator<ThunkAction<R,AppReducerType, unknown, A>>
export type ThunkAppDispatch = ThunkDispatch<AppReducerType, void, Action>;

