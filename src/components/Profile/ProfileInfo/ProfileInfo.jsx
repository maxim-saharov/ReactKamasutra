import s from './ProfileInfo.module.css';
import React from "react";

const ProfileInfo = () => {
   return (
      <div>

         <div className={s.photoBlock}>
            <img src='https://html5css.ru/css/img_forest.jpg' alt='photo555' />
         </div>

         <div className={s.descriptionBlock}>
            Avatar + description
         </div>

      </div>
   );
}

export default ProfileInfo;