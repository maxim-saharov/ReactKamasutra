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
         .then( response => response.data )

   }

}


// так было без инстанса
// export const getUsers = (currentPage, pageSize) => (
//
//    axios.get( baseUrl + `users?page=${currentPage}&count=${pageSize}`
//
//    ).then( response => response.data )
// )


