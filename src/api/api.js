//
import axios from "axios";

const instance = axios.create( {
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {'API-KEY': 'a991bdb8-903c-4ace-9a79-3ab2d68d863e'}
} )


export const usersAPI = {

   getUsers(currentPage, pageSize) {
      return instance.get( `users?page=${currentPage}&count=${pageSize}` )
         .then( response => response.data );
   },


   unfollow(userId) {
      return instance.delete( `follow/${userId}` );
   },


   follow(userId) {
      return instance.post( `follow/${userId}` );
   },

   getProfile(userId) {
      return instance.get( `profile/` + userId );
   }

}


export const authAPI = {

   me() {
      return instance.get( `auth/me` )
   },

}


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


