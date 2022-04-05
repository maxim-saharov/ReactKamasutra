//

import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReduce from "./sidebar-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers( {

   // тут ключи типо profilePage - это как бы обьекты
   // в которых лежат значения - тоест наши стейты - что тоже объекты

   profilePage: profileReducer,

   dialogsPage: dialogsReducer,

   sidebar: sidebarReduce,

   usersPage: usersReducer

} );

let store = createStore(reducers);

window.store55 = store;

// store55.getState()

export default store;
