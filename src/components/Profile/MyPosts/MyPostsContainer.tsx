//
import {connect} from 'react-redux'
import {actions} from '../../../redux/profile-reducer'
import MyPosts, {DispatchMyPostsPropsType, MapMyPostsPropsType} from './MyPosts'
import {AppStateGlobalType} from '../../../redux/redux-store'


let mapStateToProps = (state: AppStateGlobalType) => {
   return {
      posts: state.profilePage.posts
   }
}


const MyPostsContainer = connect<MapMyPostsPropsType,
   DispatchMyPostsPropsType, {}, AppStateGlobalType>(mapStateToProps,
   {
      addPost: actions.addPostActionCreator
   })(MyPosts)

export default MyPostsContainer


//region Description
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

// let mapDispatchToProps = (dispatch) => {
//
//    return {
//
//       addPost: (newPostText) => {
//          dispatch( actions.addPostActionCreator( newPostText ) )
//       }
//    }
// }
//endregion

