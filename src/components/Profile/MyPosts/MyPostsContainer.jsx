//
import {connect} from "react-redux";
import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";


let mapStateToProps = (state) => {
   return {
      posts: state.profilePage.posts,
   }
}

let mapDispatchToProps = (dispatch) => {

   return {

      addPost: (newPostText) => {
         dispatch( addPostActionCreator( newPostText ) );
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

