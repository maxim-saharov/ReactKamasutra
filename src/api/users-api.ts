//
import {GetItemsType, instance, APIResponseType} from './api'
import {AxiosPromise} from 'axios'


export const usersAPI = {

   getUsers(currentPage: number, pageSize: number) {
      return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => response.data)
   },

   follow(userId: number) {
      return instance.post<APIResponseType>(`follow/${userId}`)
         .then(res => res.data)
   },


   unfollow(userId: number) {
      return instance.delete(`follow/${userId}`)
         .then(res => res.data) as AxiosPromise<APIResponseType>
   }

}

// аксиус делит не возвражает ничего по умодчанию и мы сделали
// свою принудительную типизацию