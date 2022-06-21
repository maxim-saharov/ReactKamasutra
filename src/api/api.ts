//
import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {'API-KEY': 'a991bdb8-903c-4ace-9a79-3ab2d68d863e'}
})


export type APIResponseType<Data = {}, ResultCode = ResultCodeEnum> = {
   data: Data
   resultCode: ResultCode
   messages: Array<string>
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

export type GetItemsType = {
   items: Array<UserType>
   totalCount: number
   error: string | null
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

//тут видим что может подказать тайп скрипт
//authAPI.me().then((res) => res.data.data)


//endregion


