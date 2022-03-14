import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
   return (

      <div>
         <ProfileInfo/>
         <MyPosts/>
      </div>

   );
}

export default Profile;