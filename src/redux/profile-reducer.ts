//
import {profileAPI, usersAPI} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



let initialState = {
   posts: [
      {id: 1, message: 'Post: 101', likesCount: 5},
      {id: 2, message: 'Post: 102', likesCount: 10},
      {id: 3, message: 'Post: 103', likesCount: 15},
   ] as Array<PostType>,
   profile: null as ProfileType | null,
   status: '...text...'
}

export type InitialStateState = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateState => {

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

      case DELETE_POST:
         return {
            ...state,
            posts: state.posts.filter(p => p.id !== action.postId)
         }

      case SAVE_PHOTO_SUCCESS:
         return {
            ...state,
            profile: {...state.profile, photos: action.photos} as ProfileType
         }


      default:
         return state;
   }
}


// начало - акшен криаторы

type AddPostActionCreatorType = {
   type: typeof ADD_POST,
   newPostText: string
}

export const addPostActionCreator = (
   newPostText: string): AddPostActionCreatorType => ({
   type: ADD_POST, newPostText
})


type SetUserProfileActionType = {
   type: typeof SET_USER_PROFILE,
   profile: ProfileType
}

const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})


type SetStatusActionType = {
   type: typeof SET_STATUS,
   status: string
}

const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})


type DeletePostActionType = {
   type: typeof DELETE_POST,
   postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})

type SavePhotoSuccessActionType = {
   type: typeof SAVE_PHOTO_SUCCESS,
   photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})
// конец - акшен криаторы


// начало - санк креаторы
export const getUserProfile = (userId: number) => async (dispatch: any) => {
   const response = await usersAPI.getProfile(userId);
   dispatch(setUserProfile(response.data));
}


export const getStatus = (userId: number) => async (dispatch: any) => {
   const response = await profileAPI.getStatus(userId);
   dispatch(setStatus(response.data));
}


export const updateStatus = (status: string) => async (dispatch: any) => {
   try {
      const response = await profileAPI.updateStatus(status);
      if (response.data.resultCode === 0) {
         dispatch(setStatus(status));
      }
   } catch (error) {
      console.log(error);
   }
}


export const savePhoto = (photoFile: any) => async (dispatch: any) => {
   const response = await profileAPI.savePhoto(photoFile);
   if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
   }
};

export const saveProfile = (
   formData: ProfileType, setStatus: any, setSubmitting: any,
   goToViewMode: any) => async (dispatch: any, getState: any) => {
   const response = await profileAPI.saveProfile(formData);
   let resultCode = response.data.resultCode;
   if (resultCode === 0) {
      const userId = getState().auth.id;
      goToViewMode();
      dispatch(getUserProfile(userId));
   } else {
      let textError = `resultCode: ${resultCode} - ${response.data.messages.join(', ')}`;
      setStatus(textError);
      setSubmitting(false);
   }
};

export default profileReducer;
















