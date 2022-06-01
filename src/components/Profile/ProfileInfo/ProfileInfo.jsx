import s from './ProfileInfo.module.css';
import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.jpg";
import styles from "./ProfileInfo.module.css";


const ProfileInfo = (props) => {

   if (!props.profile) {
      return <Preloader />
   }

   debugger

   let alt_descriptionBlock = `photo_${props.profile.userId}`;

   return (
      <div>

         <div className={s.photoBlock}>
            <img src='https://html5css.ru/css/img_forest.jpg' alt='photo555' />
         </div>

         <div className={s.descriptionBlock}>

            <img src={props.profile.photos.large !== null
               ? props.profile.photos.large
               : userPhoto}
                 className={styles.userPhoto}
                 alt={alt_descriptionBlock} />

            ...Avatar + description и userId_ {props.profile.userId}
            <ProfileStatusWithHooks
               status={props.status}
               updateStatus={props.updateStatus}
            />
         </div>

      </div>
   );
}

export default ProfileInfo;