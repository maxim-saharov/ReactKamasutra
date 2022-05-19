//

import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReduce from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare from 'redux-thunk'
import appReducer from "./app-reducer";

let reducers = combineReducers( {

   // тут ключи типо profilePage - это как бы обьекты
   // в которых лежат значения - тоест наши стейты - что тоже объекты

   profilePage: profileReducer,

   dialogsPage: dialogsReducer,

   sidebar: sidebarReduce,

   usersPage: usersReducer,

   auth: authReducer,

   app: appReducer

} );

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store55 = store;

// store55.getState()

export default store;
