//

import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReduce from "./sidebar-reducer";

let reducers = combineReducers( {

   profilePage: profileReducer,

   dialogsPage: dialogsReducer,

   sidebar: sidebarReduce

} );

let store = createStore(reducers);

export default store;
