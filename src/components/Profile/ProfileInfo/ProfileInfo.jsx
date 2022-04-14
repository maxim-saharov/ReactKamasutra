import s from './ProfileInfo.module.css';
import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";


const ProfileInfo = (props) => {

   if (!props.profile) {
      return <Preloader />
   }

   let alt_descriptionBlock = `photo_${props.profile.userId}`;

   return (
      <div>

         <div className={s.photoBlock}>
            <img src='https://html5css.ru/css/img_forest.jpg' alt='photo555' />
         </div>

         <div className={s.descriptionBlock}>
            <img src={props.profile.photos.small} alt={alt_descriptionBlock} />
            ...Avatar + description и userId_ {props.profile.userId}
            <ProfileStatus
               status={props.status}
               updateStatus={props.updateStatus}
            />
         </div>

      </div>
   );
}

export default ProfileInfo;