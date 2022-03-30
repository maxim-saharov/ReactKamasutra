//
import React from "react";
import s from './MyPosts.module.css';
import Post from './Posts/Post';


const MyPosts = (props) => {

   let postsElement =
      props.posts.map( p => <Post value={p.message} likesCount={p.likesCount} key={p.id} /> );

   let newPostElement = React.createRef()


   let OnAddPost = () => {
      props.addPost();
   }


   let onPostChange = () => {
      let text = newPostElement.current.value;
      props.updateNewPostText( text );
   }


   return (
      <div className={s.postsBlock}>

         <h3 className={s.text_h3}>
            My posts:
         </h3>

         <div>
            <textarea ref={newPostElement}
                      onChange={onPostChange}
                      value={props.newPostText} />
         </div>

         <div>
            <button onClick={OnAddPost}> Add posts
            </button>
         </div>

         <div className={s.posts}>
            {postsElement}
         </div>

      </div>
   );
}

export default MyPosts;