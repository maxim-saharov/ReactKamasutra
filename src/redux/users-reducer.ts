//
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {

   users: [] as Array<UserType>,
   pageSize: 5,
   totalUsersCount: 101,
   currentPage: 2,
   isFetching: false,
   followingInProgress: [] as Array<number>, // array of users ids
   fake: 10

}

type InitialStateType = typeof initialState

const usersReducer = (
   state = initialState, action: any): InitialStateType => {

   switch (action.type) {

      case 'FAKE':
         return {
            ...state,
            fake: state.fake + 1
         }


      case FOLLOW:
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId,
               'id', {followed: true})
         }

      // эту оставил специально без рефакторинга что бы понимать как
      // оно с вынесенной фуункцией работает
      case UNFOLLOW:
         return {
            ...state,
            users: state.users.map(u => {
               if (u.id === action.userId) {
                  return {...u, followed: false}
               }
               return u;
            })
         }


      case SET_USERS:
         return {
            ...state,
            users: action.users
         }


      case SET_CURRENT_PAGE:
         return {
            ...state,
            currentPage: action.currentPage

         }

      case SET_TOTAL_USERS_COUNT:
         //alert(action.totalUsersCount)
         return {
            ...state,
            //totalUsersCount: action.totalUsersCount
            // если так вывести то создаст 4 тыс страниц!

         }

      case TOGGLE_IS_FETCHING:
         return {
            ...state,
            isFetching: action.isFetching
         }

      case TOGGLE_IS_FOLLOWING_PROGRESS:
         return {
            ...state,
            followingInProgress:
               action.isFetching
                  ? [...state.followingInProgress, action.userId]
                  : state.followingInProgress.filter(id => id !== action.userId),

         }


      default:
         return state;
   }
}

type FollowSuccessActionType = {
   type: typeof FOLLOW,
   userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});


type UnfollowSuccessActionType = {
   type: typeof UNFOLLOW,
   userId: number
}

export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});


type SetUsersActionType = {
   type: typeof SET_USERS,
   users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});


type SetCurrentPageActionType = {
   type: typeof SET_CURRENT_PAGE,
   currentPage: number
}

export const setCurrentPage = (
   currentPage: number): SetCurrentPageActionType => ({
   type: SET_CURRENT_PAGE,
   currentPage
});


type SetTotalUsersCountActionType = {
   type: typeof SET_TOTAL_USERS_COUNT,
   totalUsersCount: number
}

export const setTotalUsersCount = (
   totalUsersCount: number): SetTotalUsersCountActionType => ({
   type: SET_TOTAL_USERS_COUNT,
   totalUsersCount: totalUsersCount
});
// выше для понимая длинная запись в переменой - totalUsersCount - число 18215
// просто currentPage - это тоже самое что и currentPage: currentPage
//(тоесть мы передаем переменную с числом 5 например и получаем
// название ключа такое как была просто переменная-параметр и значение
// как было у переменной-параметра
// и потом что знась передали вторым параметром придет через акшен как
// action.currentPage


type ToggleIsFetchingActionType = {
   type: typeof TOGGLE_IS_FETCHING,
   isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
   type: TOGGLE_IS_FETCHING,
   isFetching
});


type ToggleFollowingProgressActionType = {
   type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
   isFetching: boolean,
   userId: number
}

export const toggleFollowingProgress = (
   isFetching: boolean,
   userId: number): ToggleFollowingProgressActionType => ({
   type: TOGGLE_IS_FOLLOWING_PROGRESS,
   isFetching,
   userId
});


export const requestUsersThunkCreator = (page: number, pageSize: number) => {

   return async (dispatch: any) => {
      dispatch(toggleIsFetching(true));
      //dispatch( setCurrentPage( page ) );

      let data = await usersAPI.getUsers(page, pageSize);

      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
   }

}

let followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {

   dispatch(toggleFollowingProgress(true, userId));

   let response = await apiMethod(userId);

   if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId))
   }

   dispatch(toggleFollowingProgress(false, userId));

}


export const follow = (userId: number) => {

   return async (dispatch: any) => {

      let apiMethodFollow = usersAPI.follow.bind(usersAPI);

      await followUnfollowFlow(dispatch, userId, apiMethodFollow, followSuccess);

   }
}


export const unfollow = (userId: number) => {

   return async (dispatch: any) => {

      //let apiMethodUnfollow = usersAPI.unfollow.bind( usersAPI );
      // Дима так сделал что бы не создавать типо лишние переменные
      // тоесть сразу bind сделал в параметрах

      await followUnfollowFlow(dispatch, userId,
         usersAPI.unfollow.bind(usersAPI), unfollowSuccess);

   }
}

export default usersReducer;


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

