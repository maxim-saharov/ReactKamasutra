

import s from './Profile.module.css';

const Profile = () => {
   return (
      <div className={s.content}>
         <div>
            <img src='https://html5css.ru/css/img_forest.jpg' />
         </div>

         <div className={s.myPosts}> 
         {/* эту обвертку я сам сделал  */}
            <div>
               Avatar + description
            </div>

            <div> My posts:
               <div>
                  ..New posts
               </div>
               <div>
               {/* <div className={s.posts}> */}
                  <div className={s.item}>
                     ....Post 10001
                  </div>
                  <div className={s.item}>
                     ....Post 20001
                  </div>
               </div>
            </div> 
         </div>

      </div>
   );
}

export default Profile;