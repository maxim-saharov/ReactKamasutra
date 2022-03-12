

import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';

const Profile = () => {
   return (
      <div className={s.content}>
         <div className={s.photoBlock}>
            <img src='https://html5css.ru/css/img_forest.jpg' />
         </div>

         <div className={s.textBlock}>
            {/* эту обвертку я сам сделал  */}
            <div>
               Avatar + description
            </div>
            <MyPosts />
         </div>

      </div>
   );
}

export default Profile;