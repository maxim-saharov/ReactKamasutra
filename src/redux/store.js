// этот файл оставляем чисто для анализа - это самодельный стор

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReduce from "./sidebar-reducer";


let store = {

   _state: {

      profilePage: {
         posts: [
            {id: 1, message: 'Post: 101', likesCount: 5},
            {id: 2, message: 'Post: 102', likesCount: 10},
            {id: 3, message: 'Post: 103', likesCount: 15},
         ],
         newPostText: 'aaa'
      },

      dialogsPage: {
         sidebar: [
            {id: 1, name: 'Tom'},
            {id: 2, name: 'Andrey'},
            {id: 3, name: 'Ivan'},
            {id: 4, name: 'Valera'},
         ],

         messages: [
            {id: 1, message: 'hi 11'},
            {id: 2, message: 'hi 2'},
            {id: 3, message: 'hi 3'},
         ],
         newMessageBody: 'test'
      },

      sidebar: {}
   },

   _callSubscriber() {
   },

   // getState() {
   //    return this._state;
   // },

   subscribe(observer) {
      this._callSubscriber = observer;
   },

   dispatch(action) {

      //this._state.profilePage = profileReducer(this._state.profilePage, action);
      // так тоже пока будет работать
      profileReducer(this._state.profilePage, action);


      this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);


      // это пока пустышка
      this._state.sidebar = sidebarReduce(this._state.sidebar, action);


      this._callSubscriber( this._state );

   }
}

//TODO test1

// test3

// window.store2 = store;

export default store;

