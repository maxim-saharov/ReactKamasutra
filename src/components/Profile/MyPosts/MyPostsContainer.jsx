//
import React from "react";
import {connect} from "react-redux";
import {updateNewPostTextActionCreator, addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";


let mapStateToProps = (state) => {
   return {
      posts: state.profilePage.posts,
      newPostText: state.profilePage.newPostText
   }
}

let mapDispatchToProps = (dispatch) => {
   return {
      updateNewPostText: (text) => {
         let action = updateNewPostTextActionCreator( text );
         dispatch( action );
      },
      addPost: () => {
         dispatch( addPostActionCreator() );
      }
   }
}


const MyPostsContainer = connect( mapStateToProps, mapDispatchToProps )( MyPosts );

export default MyPostsContainer;


// const MyPostsContainer = () => {
//
//    return (
//       <StoreContext_Non.Consumer>{
//
//          (store) => {
//
//             let state = store.getState();
//
//             let addPost = () => {
//                store.dispatch( addPostActionCreator() );
//             }
//
//             let onPostChange = (text) => {
//                let action = updateNewPostTextActionCreator( text );
//                store.dispatch( action );
//             }
//
//             return (
//                <MyPosts posts={state.profilePage.posts}
//                         addPost={addPost}
//                         updateNewPostText={onPostChange}
//                         newPostText={state.profilePage.newPostText}
//                />
//             )
//
//          }
//
//       }
//
//       </StoreContext_Non.Consumer>
//
//    )
// }

