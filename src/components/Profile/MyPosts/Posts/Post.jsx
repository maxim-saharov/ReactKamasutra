
import s from './Post.module.css';

const Post = (props) => {

   //debugger;
   //console.log(props)

   return (

      <div className={s.item}>
         <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4AuCaCDS8eeLRXGL0pFD9cIddYuHc8AJoSA&usqp=CAU' />
         ....Post: {props.value}
         <div>
            Like {props.likesCount}
         </div>
      </div>

   );
}

export default Post;