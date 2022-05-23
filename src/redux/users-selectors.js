//
import {createSelector} from "reselect";


const getUsersSelector = (state) => {
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

export const getPageSize = (state) => {
   return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
   return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
   return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
   return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
   return state.usersPage.followingInProgress;
}
