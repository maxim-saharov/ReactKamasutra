//
import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {

   render() {
      return (
         <Header {...this.props} />
      )
   }
}


let mapStateToProps = (state) => {
   return {
      isAuth: state.auth.isAuth,
      login: state.auth.login
   }
}


export default connect( mapStateToProps, {
   logout
} )( HeaderContainer );

// export default connect( mapStateToProps, {
//    getAuthUserData // - это короткая запись - тоже самое что написать
//- getAuthUserData: getAuthUserData
// } )( HeaderContainer );

