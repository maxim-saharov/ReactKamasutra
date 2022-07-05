//
import {AppStateGlobalType} from './redux-store'


export const selectIsAuth = (state: AppStateGlobalType) => {
   return state.auth.isAuth
}

export const selectCurrentUserLogin = (state: AppStateGlobalType) => {
   return state.auth.login
}


