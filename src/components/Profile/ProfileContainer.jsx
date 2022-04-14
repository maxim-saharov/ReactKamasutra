//
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {

   componentDidMount() {

      let userId = this.props.router.params.userId;

      if (!userId) {
         userId = 23275;
         //userId = 2;
      }

      this.props.getUserProfile( userId );

      this.props.getStatus( userId );

   }

   render() {

      return (
         <div>
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
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


let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status
})

const ProfileContainerCompose = compose(
   connect( mapStateToProps, {getUserProfile, getStatus, updateStatus} ),
   withRouter,
)( ProfileContainer )

export default ProfileContainerCompose


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

