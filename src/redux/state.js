let rerenderEntireTree

let state = {

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
      ]
   }
}

window.state = state;

export const addPost = () => {

   let newPosts = {
      id: 55,
      message: state.profilePage.newPostText,
      likesCount: 552
   };

   state.profilePage.posts.push( newPosts );
   state.profilePage.newPostText = '';
   rerenderEntireTree( state );

}

export const updateNewPostText = (newText) => {

   state.profilePage.newPostText = newText;

   rerenderEntireTree( state );

}

export const subscribe = (observer) => {

   rerenderEntireTree = observer;

}

export default state;

