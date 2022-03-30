//

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
   posts: [
      {id: 1, message: 'Post: 101', likesCount: 5},
      {id: 2, message: 'Post: 102', likesCount: 10},
      {id: 3, message: 'Post: 103', likesCount: 15},
   ],
   newPostText: 'aaa'
}

const profileReducer = (state = initialState, action) => {

   switch (action.type) {

      case UPDATE_NEW_POST_TEXT:

         return {
            ...state,
            newPostText: action.newText
         };


      case ADD_POST: {
         let newPosts = {
            id: 55,
            message: state.newPostText,
            likesCount: 552
         };

         return {
            ...state,
            posts: [...state.posts, newPosts],
            newPostText: ''
         };
      }


      default:
         return state;
   }
}

export const updateNewPostTextActionCreator = (text) => ({
   type: UPDATE_NEW_POST_TEXT,
   newText: text
})

export const addPostActionCreator = () => ({type: ADD_POST})

export default profileReducer;
