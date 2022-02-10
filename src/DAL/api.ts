import axios from "axios";
import {AuthMeType, GetCaptchaType, GetStatus, GetUserType, LoginType, PutPhoto} from './typeRequest'
import { profileType } from './../Redux/profileReduser'
import { filterUsers } from "../Redux/usersReduser";

let instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "352c90ad-3ef7-45e1-a349-cc1b511e4092"
    }
})

export const apiGet = {
    getUser(count: number | null, pageNumber: number | null, term: string, friend: filterUsers["friend"]) {
        return instance.get<GetUserType>(`users?page=${pageNumber}&count=${count}&term=${term}&friend=${friend}`) //error loaging //true

    },
    
  
    getProfile(userId: number | null) {

        return instance.get<profileType>(`profile/${userId}`)  //error loading //true

    },
    getAuthMe() {

        return instance.get<AuthMeType>(`auth/me`).then(response => {
            
            return response 
        }) //error loading //true

    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {

        return instance.post<LoginType>('auth/login', { email: email, password: password, rememberMe: rememberMe, captcha: captcha })
    }, //true
    logOut() {

        return instance.delete<LoginType>('auth/login')  // notification /true
    },
    follow(userId: number | null) {

        return instance.post<LoginType>(`/follow/${userId}`).then(response => { // notification /true
            return response.data
        })
    },
    unfollow(userId: number | null) {

        return instance.delete<LoginType>(`/follow/${userId}`).then(response => { // notification /true
            return response.data
        })
    },
    getStatus(userId: number | null) {

        return instance.get<GetStatus>(`/profile/status/${userId}`)  // notification //true

    },
    setStatus(text: string) {

        return instance.put<LoginType>('/profile/status', { status: text }) // notification //true

    },
    setProfileInfo(formInfo: any) {

        return instance.put<LoginType>('/profile', formInfo) // notification /true

    },
    putPhoto(photo: any) {

        let formData = new FormData()
        formData.append("image", photo)
        return instance.put<PutPhoto>('/profile/phot', formData, { // notification /true
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    getCaptcha() {

        return instance.get<GetCaptchaType>('/security/get-captcha-url')//true
        
    }


}