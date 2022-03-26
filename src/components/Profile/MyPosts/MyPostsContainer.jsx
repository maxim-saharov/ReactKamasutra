//
import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../StoreContext";
import store from "../../../redux/redux-store";


const MyPostsContainer = (props) => {

   // let state = props.store.getState();
   //
   // let addPost = () => {
   //    props.store.dispatch( addPostActionCreator() );
   // }
   //
   //
   // let onPostChange = (text) => {
   //    let action = updateNewPostTextActionCreator( text );
   //    props.store.dispatch( action );
   // }


   return (
      <StoreContext.Consumer>{

         (store) => {

            let state = store.getState();

            let addPost = () => {
               store.dispatch( addPostActionCreator() );
            }

            let onPostChange = (text) => {
               let action = updateNewPostTextActionCreator( text );
               store.dispatch( action );
            }

            return (
               <MyPosts posts={state.profilePage.posts}
                        addPost={addPost}
                        updateNewPostText={onPostChange}
                        newPostText={state.profilePage.newPostText}
               />
            )

         }

      }

      </StoreContext.Consumer>

   )
}

export default MyPostsContainer;


// <MyPosts posts={state.profilePage.posts}
//          addPost={addPost}
//          updateNewPostText={onPostChange}
//          newPostText={state.profilePage.newPostText}
// />
