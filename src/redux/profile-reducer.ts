//
import {PhotosType, PostType, ProfileType} from '../types/types'
import {profileAPI} from '../api/profile-api'
import {BaseThunkType, InferActionsTypes} from './redux-store'


let initialState = {
   posts: [
      {id: 1, message: 'Post: 101', likesCount: 5},
      {id: 2, message: 'Post: 102', likesCount: 10},
      {id: 3, message: 'Post: 103', likesCount: 15}
   ] as Array<PostType>,
   profile: null as ProfileType | null,
   status: 'double click here to change status'
}

type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

   switch (action.type) {

      case 'SN/PROFILE/ADD-POST': {

         let nextIdMessages = state.posts.length + 1

         let newPosts = {
            id: nextIdMessages + action.newPostText,
            message: action.newPostText,
            likesCount: 552
         }

         return {
            ...state,
            posts: [...state.posts, newPosts]
         }
      }

      case 'SN/PROFILE/SET_USER_PROFILE':
         return {
            ...state,
            profile: action.profile
         }

      case 'SN/PROFILE/SET_STATUS':
         return {
            ...state,
            status: action.status
         }

      case 'SN/PROFILE/DELETE_POST':
         return {
            ...state,
            posts: state.posts.filter(p => p.id !== action.postId)
         }

      case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
         return {
            ...state,
            profile: {...state.profile, photos: action.photos} as ProfileType
         }


      default:
         return state
   }
}


export const actions = {

   addPostActionCreator: (newPostText: string) => ({
      type: 'SN/PROFILE/ADD-POST', newPostText
   } as const),

   setUserProfile: (profile: ProfileType) => (
      {type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),

   setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),

   deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),

   savePhotoSuccess: (photos: PhotosType) => ({
      type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos
   } as const)
}


// начало - санк креаторы
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
   const responseData = await profileAPI.getProfile(userId)
   dispatch(actions.setUserProfile(responseData))
}


export const getStatus = (userId: number): ThunkType => async (dispatch) => {
   const responseData = await profileAPI.getStatus(userId)
   dispatch(actions.setStatus(responseData))
}


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
   try {
      const responseData = await profileAPI.updateStatus(status)
      if (responseData.resultCode === 0) {
         dispatch(actions.setStatus(status))
      }
   } catch (error) {
      console.log(error)
   }
}


export const savePhoto = (photoFile: File): ThunkType => async (dispatch) => {
   const responseData = await profileAPI.savePhoto(photoFile)
   if (responseData.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(responseData.data.photos))
   }
}


export const saveProfile = (
   formData: ProfileType, setStatus: any, setSubmitting: any,
   goToViewMode: any): ThunkType => async (
   dispatch, getState) => {
   const responseData = await profileAPI.saveProfile(formData)
   let resultCode = responseData.resultCode
   if (resultCode === 0) {
      const userId = getState().auth.id
      goToViewMode()
      if (userId) {
         await dispatch(getUserProfile(userId))
      } else {
         throw new Error('userId can\'t be null')
      }


   } else {
      let textError = `resultCode: ${resultCode} - ${responseData.messages.join(', ')}`
      setStatus(textError)
      setSubmitting(false)
   }
}


export default profileReducer

// aaa.toString().555
// //
// //55
// let aaa = 555














