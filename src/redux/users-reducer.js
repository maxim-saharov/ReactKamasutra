//

import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {

   users: [],
   pageSize: 5,
   totalUsersCount: 101,
   currentPage: 2,
   isFetching: false,
   followingInProgress: [],
   fake: 10

}


const usersReducer = (state = initialState, action) => {

   switch (action.type) {

      case 'FAKE':
         return {
            ...state,
            fake: state.fake + 1
         }


      case FOLLOW:
         return {
            ...state,
            users: updateObjectInArray( state.users, action.userId,
               'id', {followed: true} )
         }

      // эту оставил специально без рефакторинга что бы понимать как
      // оно с вынесенной фуункцией работает
      case UNFOLLOW:
         return {
            ...state,
            users: state.users.map( u => {
               if (u.id === action.userId) {
                  return {...u, followed: false}
               }
               return u;
            } )
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
         //alert(action.TotalUsersCount)
         return {
            ...state,
            //totalUsersCount: action.TotalUsersCount
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
                  : state.followingInProgress.filter( id => id !== action.userId ),

         }


      default:
         return state;
   }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId});

export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});

export const setUsers = (users) => ({type: SET_USERS, users});

export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});

export const setTotalUsersCount = (TotalUsersCount) => ({
   type: SET_TOTAL_USERS_COUNT,
   TotalUsersCount: TotalUsersCount
});
// выше для понимая длинная запись в переменой - TotalUsersCount - число 18215
// просто currentPage - это тоже самое что и currentPage: currentPage
//(тоесть мы передаем переменную с числом 5 например и получаем
// название ключа такое как была просто переменная-параметр и значение
// как было у переменной-параметра
// и потом что знась передали вторым параметром придет через акшен как
// action.currentPage

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const toggleFollowingProgress = (isFetching, userId) => ({
   type: TOGGLE_IS_FOLLOWING_PROGRESS,
   isFetching,
   userId
});


export const requestUsersThunkCreator = (page, pageSize) => {

   return async (dispatch) => {
      dispatch( toggleIsFetching( true ) );
      //dispatch( setCurrentPage( page ) );

      let data = await usersAPI.getUsers( page, pageSize );

      dispatch( toggleIsFetching( false ) );
      dispatch( setUsers( data.items ) );
      dispatch( setTotalUsersCount( data.totalCount ) );
   }

}

let followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

   dispatch( toggleFollowingProgress( true, userId ) );

   let response = await apiMethod( userId );

   if (response.data.resultCode === 0) {
      dispatch( actionCreator( userId ) )
   }

   dispatch( toggleFollowingProgress( false, userId ) );

}


export const follow = (userId) => {

   return async (dispatch) => {

      let apiMethodFollow = usersAPI.follow.bind( usersAPI );

      await followUnfollowFlow( dispatch, userId, apiMethodFollow, followSuccess );

   }
}


export const unfollow = (userId) => {

   return async (dispatch) => {

      //let apiMethodUnfollow = usersAPI.unfollow.bind( usersAPI );
      // Дима так сделал что бы не создавать типо лишние переменные
      // тоесть сразу bind сделал в параметрах

      await followUnfollowFlow( dispatch, userId,
         usersAPI.unfollow.bind( usersAPI ), unfollowSuccess );

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
//       name: 'bnantares55555',
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

