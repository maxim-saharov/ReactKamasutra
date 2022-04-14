//
import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
   posts: [
      {id: 1, message: 'Post: 101', likesCount: 5},
      {id: 2, message: 'Post: 102', likesCount: 10},
      {id: 3, message: 'Post: 103', likesCount: 15},
   ],
   newPostText: 'aaa',
   profile: null,
   status: '...text...'
}

const profileReducer = (state = initialState, action) => {

   switch (action.type) {

      case UPDATE_NEW_POST_TEXT:

         return {
            ...state,
            newPostText: action.newText
         }


      case ADD_POST: {
         let newPosts = {
            id: 55,
            message: state.newPostText,
            likesCount: 552
         }

         return {
            ...state,
            posts: [...state.posts, newPosts],
            newPostText: ''
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

export const updateNewPostTextActionCreator = (text) => ({
   type: UPDATE_NEW_POST_TEXT,
   newText: text
})

export const addPostActionCreator = () => ({type: ADD_POST})


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
