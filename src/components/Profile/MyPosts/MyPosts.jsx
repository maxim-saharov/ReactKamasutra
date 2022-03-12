

// import s from './MyPosts.module.css';
import Post from './Posts/Post';

const MyPosts = () => {
   return (
      <div> My posts:
         <div>
            <textarea></textarea>
            <button>Add posts</button>
         </div>
         <div>
            <Post value='101' likesCount='5'/>
            <Post value='102' likesCount='10'/>
            <Post value='103' likesCount='15'/>
         </div>
      </div> 
   );
}

export default MyPosts;