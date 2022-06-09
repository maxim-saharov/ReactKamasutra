//
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
   getStatus,
   getUserProfile,
   savePhoto,
   saveProfile,
   updateStatus
} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {Navigate} from "react-router-dom";


class ProfileContainer extends React.Component {
   constructor(props) {
      super( props );
      this.state = {
         isShowMyProfile: true
      }
   }


   componentDidMount() {

      let userIdFromPath = +this.props.router.params.userId;
      let authorisedUserId = this.props.authorisedUserId;

      if (userIdFromPath) {
         //userId = 2;
         //userId = 23275;
         this.props.getUserProfile( userIdFromPath );
         this.props.getStatus( userIdFromPath );

      } else {

         if (this.props.isAuth) {
            this.props.getUserProfile( authorisedUserId );
            this.props.getStatus( authorisedUserId );
         }
      }
   }

   componentDidUpdate(prevProps, prevState, snapshot) {

      let userIdFromPath = +this.props.router.params.userId;
      let authorisedUserId = this.props.authorisedUserId;
      let isShowMyProfile = this.state.isShowMyProfile;

      if (isShowMyProfile) {

         if (userIdFromPath === authorisedUserId) {
            this.setState( {isShowMyProfile: false} )
         }

         if (!userIdFromPath && this.props.isAuth) {
            this.props.getUserProfile( authorisedUserId );
            this.props.getStatus( authorisedUserId );
            this.setState( {isShowMyProfile: false} )
         }
      }
   }


   render() {

      if (!this.props.isAuth && !this.props.router.params.userId) {
         return <Navigate to={'/login'} />
      }

      let userIdFromPath = +this.props.router.params.userId;
      let authorisedUserId = this.props.authorisedUserId;


      let isOwner = false;
      if (!userIdFromPath && this.props.isAuth) {
         isOwner = true;
      } else if (userIdFromPath === authorisedUserId) {
         isOwner = true;
      }


      return (
         <div>
            <Profile
               profile={this.props.profile}
               status={this.props.status}
               updateStatus={this.props.updateStatus}
               isOwner={isOwner}
               savePhoto={this.props.savePhoto}
               saveProfile={this.props.saveProfile}
            />
         </div>
      )
   }
}


// wrapper to use react router's v6 hooks in class component (to use HOC pattern, like in router v5)
function withRouter(Component) {

   function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();

      return <Component
         {...props}
         router={{location, navigate, params}} />;
   }

   return ComponentWithRouterProp;
}


let mapStateToProps = (state) => {


   return {
      profile: state.profilePage.profile,
      status: state.profilePage.status,
      authorisedUserId: state.auth.id,
      isAuth: state.auth.isAuth
   }
}


const ProfileContainerCompose = compose(
   withRouter,
   connect( mapStateToProps,
      {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} )
)( ProfileContainer );

export default ProfileContainerCompose;


//fake: state.usersPage.fake

//setTimeout( () => {
//this.props.getStatus( userId );
//}, 2000 )

// так было без compose
//let AuthRedirectComponent = WithAuthRedirect( ProfileContainer );
//
// export default connect( mapStateToProps, {
//    getUserProfile
// } )( withRouter( AuthRedirectComponent ) );

// так было без хок функции общей
// let AuthRedirectComponent = (props) => {
//
//    if (!props.isAuth) {
//       return <Navigate to={'/login'} />
//    }
//    return <ProfileContainer {...props} />
// }

// так было без withRouter
// export default connect( mapStateToProps, {
//    setUserProfile
// } )( ProfileContainer );

// <Profile {...this.props} - это нужно что бы то что идет сверху
// не потерялось
// {/*можно и не передавать оно вроде как автоматом прокидывается */}

// if (!this.props.isAuth) {
//    return <Navigate to={'/login'} />
// }

