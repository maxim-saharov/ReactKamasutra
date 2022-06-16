//
import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";


const getUsersSelector = (state: AppStateType) => {
   return state.usersPage.users;
}

//это для теста типо делаем какую то сортировку и возвращаем новый массив
// и тут уже зависимоти работают
export const getUsersSuperSelector = createSelector(
   getUsersSelector,
   (users) => {
      return users.filter( unit => unit );
   }
)

export const getPageSize = (state: AppStateType) => {
   return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
   return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
   return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
   return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
   return state.usersPage.followingInProgress;
}
