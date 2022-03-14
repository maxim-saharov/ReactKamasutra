import s from './MyPosts.module.css';
import Post from './Posts/Post';

const MyPosts = () => {
   return (

      <div className={s.postsBlock}>

         <h3 className={s.text_h3}>
            My posts:
         </h3>

         <div>
            <textarea>some text</textarea>
         </div>

         <div>
            <button>Add posts</button>
         </div>

         <div className={s.posts}>
            <Post value='101' likesCount='5' />
            <Post value='102' likesCount='10' />
            <Post value='103' likesCount='15' />
         </div>

      </div>
   );
}

export default MyPosts;