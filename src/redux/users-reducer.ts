//
import {updateObjectInArray} from '../utils/object-helpers'
import {UserType} from '../types/types'
import {BaseThunkType, InferActionsTypes} from './redux-store'
import {Dispatch} from 'redux'
import {usersAPI} from '../api/users-api'
import {APIResponseType} from '../api/api'
//

let initialState = {
   users: [] as Array<UserType>,
   pageSize: 5,
   totalUsersCount: 101,
   currentPage: 1,
   isFetching: false,
   followingInProgress: [] as Array<number>, // array of users ids
   filter: {term: '', friend: null as null | boolean}
}


export type InitialStateUsersReducerType = typeof initialState

export type FilterUsersReducerType = typeof initialState.filter

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>


const usersReducer = (
   state = initialState, action: ActionsType): InitialStateUsersReducerType => {

   switch (action.type) {

      case 'SN/USERS/FOLLOW':
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId,
               'id', {followed: true})
         }

      // эту оставил специально без рефакторинга что бы понимать как
      // оно с вынесенной фуункцией работает
      case 'SN/USERS/UNFOLLOW':
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userId) {
                  return {...u, followed: false}
               }
               return u
            })
         }


      case 'SN/USERS/SET_USERS':
         return {
            ...state,
            users: action.users
         }


      case 'SN/USERS/SET_CURRENT_PAGE':
         return {
            ...state,
            currentPage: action.currentPage

         }

      case 'SN/USERS/SET_TOTAL_USERS_COUNT':

         if (action.totalUsersCount > 101) {
            return {
               ...state,
               totalUsersCount: 101
               // если так вывести без условия то создаст 4 тыс страниц!
            }
         } else {
            return {
               ...state,
               totalUsersCount: action.totalUsersCount
            }
         }


      case 'SN/USERS/TOGGLE_IS_FETCHING':
         return {
            ...state,
            isFetching: action.isFetching
         }

      case 'SN/USERS/SET_FILTER':
         return {
            ...state,
            filter: action.payload
         }

      case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
         return {
            ...state,
            followingInProgress:
               action.isFetching
                  ? [...state.followingInProgress, action.userId]
                  : state.followingInProgress.filter(
                  id => id !== action.userId)
         }


      default:
         return state
   }
}


export const actions = {

   followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),

   unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),

   setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),

   setCurrentPage: (currentPage: number) => ({
      type: 'SN/USERS/SET_CURRENT_PAGE',
      currentPage
   } as const),

   setFilter: (filter: FilterUsersReducerType) => ({
      type: 'SN/USERS/SET_FILTER',
      payload: filter
   } as const),


   setTotalUsersCount: (
      totalUsersCount: number) => ({
      type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
      totalUsersCount: totalUsersCount
   } as const),


   toggleIsFetching: (isFetching: boolean) => ({
      type: 'SN/USERS/TOGGLE_IS_FETCHING',
      isFetching
   } as const),


   toggleFollowingProgress: (
      isFetching: boolean,
      userId: number) => ({
      type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId
   } as const)

}


// ниже санки

export const requestUsers = (
   page: number, pageSize: number, filter: FilterUsersReducerType): ThunkType => {

   return async (
      dispatch) => {

      dispatch(actions.toggleIsFetching(true))

      dispatch(actions.setCurrentPage(page))

      dispatch(actions.setFilter(filter))

      let data = await usersAPI.getUsersAPI(
         page, pageSize, filter.term, filter.friend)

      dispatch(actions.toggleIsFetching(false))
      dispatch(actions.setUsers(data.items))
      dispatch(actions.setTotalUsersCount(data.totalCount))
   }

}


type ActionCreatorTypesFor_followUnfollowFlow = (
   userId: number) => ActionsType;

type DispatchType = Dispatch<ActionsType>;

type ApiMethodType = (userId: number) => Promise<APIResponseType>


let _followUnfollowFlow = async (
   dispatch: DispatchType, userId: number,
   apiMethod: ApiMethodType,
   actionCreator: ActionCreatorTypesFor_followUnfollowFlow) => {

   dispatch(actions.toggleFollowingProgress(true, userId))

   let responseData = await apiMethod(userId)

   if (responseData.resultCode === 0) {
      dispatch(actionCreator(userId))
   }

   dispatch(actions.toggleFollowingProgress(false, userId))

}


export const follow = (userId: number): ThunkType => {

   return async (dispatch) => {

      let apiMethodFollow = usersAPI.follow.bind(usersAPI)

      await _followUnfollowFlow(dispatch, userId, apiMethodFollow, actions.followSuccess)

   }
}


export const unfollow = (userId: number): ThunkType => {

   return async (dispatch) => {

      //let apiMethodUnfollow = usersAPI.unfollow.bind( usersAPI );
      // Дима так сделал что бы не создавать типо лишние переменные
      // тоесть сразу bind сделал в параметрах

      await _followUnfollowFlow(dispatch, userId,
         usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)

   }
}

export default usersReducer


//region Description

// let initialState = {
//    //fake: 10
// }

//let aaa = getState().ssss; // это для теста

// выше для понимая длинная запись в переменой - totalUsersCount - число 18215
// просто currentPage - это тоже самое что и currentPage: currentPage
//(тоесть мы передаем переменную с числом 5 например и получаем
// название ключа такое как была просто переменная-параметр и значение
// как было у переменной-параметра
// и потом что знась передали вторым параметром придет через акшен как
// action.currentPage

//users: [...state.users], это тоже самое что и ниже
//users: state.users.map( u => u ),

// это означает что мы развернули и склеили два массива
//users: [...state.users, ...action.users]

// так было до рефакторинга
// export const follow = (userId) => {
//
//    return async (dispatch) => {
//
//       dispatch( toggleFollowingProgress( true, userId ) );
//
//       let response = await usersAPI.follow( userId );
//
//       if (response.data.resultCode === 0) {
//          dispatch( followSuccess( userId ) )
//       }
//
//       dispatch( toggleFollowingProgress( false, userId ) );
//    }
// }
// export const unfollow = (userId) => {
//
//    return async (dispatch) => {
//
//       dispatch( toggleFollowingProgress( true, userId ) );
//
//       let response = await usersAPI.unfollow( userId );
//
//       if (response.data.resultCode === 0) {
//          dispatch( unfollowSuccess( userId ) )
//       }
//
//       dispatch( toggleFollowingProgress( false, userId ) );
//    }
// }

// initialState.users = [
//    {
//       name: '55555',
//       id: 24295,
//       uniqueUrlName: null,
//       photos: {
//          small: null,
//          large: null
//       },
//       status: null,
//       followed: false
//    },
// ]

// case 'FAKE':
// return {
//    ...state,
//    fake: state.fake + 1
// }

// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


// export const followSuccess = (userId: number) => ({type: FOLLOW, userId});
//
// export const unfollowSuccess = (userId: number) => ({type: UNFOLLOW, userId});
//
// export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users});
//
// export const setCurrentPage = (
//    currentPage: number) => ({
//    type: SET_CURRENT_PAGE,
//    currentPage
// });
//
// export const setTotalUsersCount = (
//    totalUsersCount: number) => ({
//    type: SET_TOTAL_USERS_COUNT,
//    totalUsersCount: totalUsersCount
// });
// // выше для понимая длинная запись в переменой - totalUsersCount - число 18215
// // просто currentPage - это тоже самое что и currentPage: currentPage
// //(тоесть мы передаем переменную с числом 5 например и получаем
// // название ключа такое как была просто переменная-параметр и значение
// // как было у переменной-параметра
// // и потом что знась передали вторым параметром придет через акшен как
// // action.currentPage
//
// export const toggleIsFetching = (isFetching: boolean) => ({
//    type: TOGGLE_IS_FETCHING,
//    isFetching
// });
//
// export const toggleFollowingProgress = (
//    isFetching: boolean,
//    userId: number) => ({
//    type: TOGGLE_IS_FOLLOWING_PROGRESS,
//    isFetching,
//    userId
// });


//endregion

