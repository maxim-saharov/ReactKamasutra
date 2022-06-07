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

   let alt_descriptionBlock = `photo_${props.profile.userId}`;

   const onMainPhotoSelected = (event) => {
      if (event.target.files.length) {
         props.savePhoto( event.target.files[0] )
      }
   }


   return (
      <div>

         <div className={s.photoBlock}>
            <img src='https://html5css.ru/css/img_forest.jpg' alt='photo555' />
         </div>

         <div className={s.descriptionBlock}>

            <img src={props.profile.photos.small !== null
               ? props.profile.photos.small
               : userPhoto}
                 className={styles.userPhoto}
                 alt={alt_descriptionBlock}
            />

            ...Avatar + description и userId_ {props.profile.userId}

            <div>
               {props.isOwner
               &&
               <input
                  type={'file'}
                  onChange={onMainPhotoSelected}
               />}
            </div>


            <ProfileStatusWithHooks
               status={props.status}
               updateStatus={props.updateStatus}
            />

         </div>

      </div>
   );
}

export default ProfileInfo;