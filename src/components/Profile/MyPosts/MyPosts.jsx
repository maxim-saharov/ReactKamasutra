import s from './MyPosts.module.css';
import Post from './Posts/Post';
import React from "react";

const MyPosts = (props) => {

   let postsElement =
      props.posts.map( p => <Post value={p.message} likesCount={p.likesCount} /> );

   let newPostElement = React.createRef()

   let addPost = () => {

      props.addPost();
   }

   let onPostChange = () => {

      let text = newPostElement.current.value;

      props.updateNewPostText(text)

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
            <button onClick={addPost}> Add posts
            </button>
         </div>

         <div className={s.posts}>
            {postsElement}
         </div>

      </div>
   );
}

export default MyPosts;