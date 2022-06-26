//
import {createSelector} from 'reselect'
import {AppStateGlobalType} from './redux-store'


const getUsersSelector = (state: AppStateGlobalType) => {
   return state.usersPage.users
}

//это для теста типо делаем какую то сортировку и возвращаем новый массив
// и тут уже зависимоти работают
export const getUsersSuperSelector = createSelector(
   getUsersSelector,
   (users) => {
      return users.filter(unit => unit)
   }
)

export const getPageSize = (state: AppStateGlobalType) => {
   return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateGlobalType) => {
   return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateGlobalType) => {
   return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateGlobalType) => {
   return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateGlobalType) => {
   return state.usersPage.followingInProgress
}

export const getUsersFilter = (state: AppStateGlobalType) => {
   return state.usersPage.filter
}



