//
import axios from "axios";
import {ProfileType} from "../types/types";

const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {'API-KEY': 'a991bdb8-903c-4ace-9a79-3ab2d68d863e'}
})

type ValueObjLoginType = {
   email: string,
   password: string,
   rememberMe: boolean,
   captcha: null | string
}

export enum ResultCodeEnum {
   Success = 0,
   Error = 1
}

export enum ResultCodeForCaptchaEnum {
   Success = 0,
   Error = 1,
   CaptchaIsRequired = 10
}


type MeResponseType = {
   data: {
      id: number,
      email: string,
      login: string
   },
   resultCode: ResultCodeEnum,
   messages: Array<string>,
}

type LoginMeResponseType = {
   data: {
      userId: number

   },
   resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum,
   messages: Array<string>,
}

export const authAPI = {

   me() {
      return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
   },

   login(values: ValueObjLoginType) {
      return instance.post<LoginMeResponseType>(
         `auth/login`,
         values).then(res => res.data);
   },

   logout() {
      return instance.delete(`auth/login`);
   }

}

//тут видим что может подказать тайп скрипт
//authAPI.me().then((res) => res.data.data)


export const usersAPI = {

   getUsers(currentPage: number, pageSize: number) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => response.data);
   },


   unfollow(userId: number) {
      return instance.delete(`follow/${userId}`);
   },


   follow(userId: number) {
      return instance.post(`follow/${userId}`);
   },

   getProfile(userId: number) {
      //console.warn('это старый метод - переделай его на
      //profileAPI.getProfile');
      return profileAPI.getProfile(userId);
   }

}


export const profileAPI = {

   getProfile(userId: number) {
      return instance.get(`profile/` + userId);
   },

   getStatus(userId: number) {
      return instance.get(`profile/status/` + userId);
   },

   updateStatus(status: string) {
      return instance.put(`profile/status`, {status: status});
   },

   savePhoto(photoFile: any) {
      const formData = new FormData();
      formData.append('image', photoFile);
      return instance.put(`profile/photo`, formData);
   },

   saveProfile(formData: ProfileType) {
      return instance.put(`profile`, formData);
   }

}

export const securityAPI = {

   getCaptchaAPI() {
      return instance.get(`/security/get-captcha-url`);
   },


}


//region Description
// так было без инстанса
// export const getUsers = (currentPage, pageSize) => (
//
//    axios.get( baseUrl + `users?page=${currentPage}&count=${pageSize}`
//
//    ).then( response => response.data )
// )

// unfollow(userId) {
//    axios.delete( `https://social-network.samuraijs.com/api/1.0/follow/${userId}`,
//       {
//          withCredentials: true,
//          headers: {'API-KEY': 'a991bdb8-903c-4ace-9a79-3ab2d68d863e'}
//       } )
// },
//
// follow(userId) {
//    axios.post( `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
//       {
//          withCredentials: true,
//          headers: {'API-KEY': 'a991bdb8-903c-4ace-9a79-3ab2d68d863e'}
//       } )
// },
//endregion


