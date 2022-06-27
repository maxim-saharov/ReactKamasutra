//
import {GetItemsType, instance, APIResponseType} from './api'


export const usersAPI = {

   getUsersAPI(currentPage: number, pageSize: number,
               term: string = '', friend: null | boolean = null) {


      const urlQuery = `users?page=${currentPage}&count=${pageSize}`
         + (term === '' ? '' : `&term=${term}`)
         + (friend === null ? '' : `&friend=${friend}`)

      return instance.get<GetItemsType>(urlQuery)
         .then(response => response.data)
   },

   follow(userId: number) {
      return instance.post<APIResponseType>(`follow/${userId}`)
         .then(res => res.data)
   },


   unfollow(userId: number) {
      return instance.delete<APIResponseType>(`follow/${userId}`)
         .then(res => res.data)
   }

}


// аксиус делит не возвражает ничего по умодчанию и мы сделали
// свою принудительную типизацию
// unfollow(userId: number) {
//    return instance.delete(`follow/${userId}`)
//       .then(res => res.data) //as Promise<APIResponseType>
// }
