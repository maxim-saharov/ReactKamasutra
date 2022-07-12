//
import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReduce from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'
import appReducer from './app-reducer'
import chatReducer from './chat-reducer'

let rootReducers = combineReducers({

   // тут ключи типо profilePage - это как бы обьекты
   // в которых лежат значения - тоест наши стейты - что тоже объекты

   profilePage: profileReducer,

   dialogsPage: dialogsReducer,

   sidebar: sidebarReduce,

   usersPage: usersReducer,

   auth: authReducer,

   app: appReducer,

   chat: chatReducer

})


type RootReducersType = typeof rootReducers;

export type AppStateGlobalType = ReturnType<RootReducersType>;


export type BaseThunkType<ActionTypes extends Action,
   ReturnType = Promise<void>> = ThunkAction<ReturnType,
   AppStateGlobalType, unknown, ActionTypes>


// это что бы работал Redux DevTools
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//    reducers,
//    composeEnhancers( applyMiddleware( thunkMiddleWare )
//    ) );


export type InferActionsTypes<T> = T extends {
   [key: string]: (...args: any[]) => infer U
} ? U : never;

let store = createStore(rootReducers, applyMiddleware(thunkMiddleWare))


// @ts-ignore
window.store55 = store

// store55.getState()

export default store


// старая полная длиннная версия для понимания
// type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
//
// export type InferActionsTypes<T extends {
//    [key: string]: (...args: any[]) => any
// }> = ReturnType<PropertiesType<T>>;















