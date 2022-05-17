//
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
   posts: [
      {id: 1, message: 'Post: 101', likesCount: 5},
      {id: 2, message: 'Post: 102', likesCount: 10},
      {id: 3, message: 'Post: 103', likesCount: 15},
   ],
   profile: null,
   status: '...text...'
}

const profileReducer = (state = initialState, action) => {

   switch (action.type) {

      case ADD_POST: {

         let nextIdMessages = state.posts.length + 1

         let newPosts = {
            id: nextIdMessages + action.newPostText,
            message: action.newPostText,
            likesCount: 552
         }

         return {
            ...state,
            posts: [...state.posts, newPosts],
         }
      }

      case SET_USER_PROFILE:
         return {
            ...state,
            profile: action.profile
         }

      case SET_STATUS:
         return {
            ...state,
            status: action.status
         }


      default:
         return state;
   }
}


export const addPostActionCreator = (newPostText) => ({
   type: ADD_POST, newPostText
})


const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const getUserProfile = (userId) => (dispatch) => {
   usersAPI.getProfile( userId )
      .then( response => {
         dispatch( setUserProfile( response.data ) );
      } );
}


const setStatus = (status) => ({type: SET_STATUS, status})

export const getStatus = (userId) => (dispatch) => {

   profileAPI.getStatus( userId )
      .then( response => {
         dispatch( setStatus( response.data ) );
      } );

}


export const updateStatus = (status) => (dispatch) => {

   profileAPI.updateStatus( status )
      .then( response => {

         if (response.data.resultCode === 0) {
            dispatch( setStatus( status ) );
         }

      } );

}


export default profileReducer;
