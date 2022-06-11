//
import axios from "axios";

const instance = axios.create( {
   withCredentials: true,
   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
   headers: {'API-KEY': 'a991bdb8-903c-4ace-9a79-3ab2d68d863e'}
} )


export const authAPI = {

   me() {
      return instance.get( `auth/me` );
   },

   login(values) {
      return instance.post(
         `auth/login`,
         values );
   },

   logout() {
      return instance.delete( `auth/login` );
   }

}


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
      //console.warn('это старый метод - переделай его на
      //profileAPI.getProfile');
      return profileAPI.getProfile( userId );
   }

}


export const profileAPI = {

   getProfile(userId) {
      return instance.get( `profile/` + userId );
   },

   getStatus(userId) {
      return instance.get( `profile/status/` + userId );
   },

   updateStatus(status) {
      return instance.put( `profile/status`, {status: status} );
   },

   savePhoto(photoFile) {
      const formData = new FormData();
      formData.append( 'image', photoFile );
      return instance.put( `profile/photo`, formData );
   },

   saveProfile(formData) {
      return instance.put( `profile`, formData );
   }

}

export const securityAPI = {

   getCaptchaAPI() {
      return instance.get( `/security/get-captcha-url` );
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


