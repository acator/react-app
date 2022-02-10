import { userInfo } from '../Redux/usersReduser'

export enum ResultCode {
    Success = 0,
    Error = 1,
    Captcha = 10
}
export type GetUserType = {
    items: Array<userInfo>
    totalCount: number 
    error: string
}
export type AuthMeType = {
    data: {
        id: number | null
        email: string
        login:string
    }
    resultCode: ResultCode
    messages: Array<string>
}
export type LoginType = {
    resultCode: ResultCode
    messages:Array<string>
    data: {userId: number}
}
export type GetStatus = {
   status: string
}
export type GetCaptchaType = {
    url: string
}
export type PutPhoto = {
    data:{
        small: string
        large: string
    }
    resultCode: ResultCode
    messages:Array<string>
}