//
import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

class Profile extends React.Component {


   render() {

      return (
         <div>
            <ProfileInfo
               profile={this.props.profile}
               status={this.props.status}
               updateStatus={this.props.updateStatus}
            />
            <MyPostsContainer
            />
         </div>
      );
   }
}

export default Profile;

