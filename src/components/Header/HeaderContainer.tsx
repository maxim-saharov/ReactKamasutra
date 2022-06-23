//
import React from 'react'
import Header, {DispatchHeaderPropsType, MapHeaderPropsType} from './Header'
import {connect} from 'react-redux'
import {logout} from '../../redux/auth-reducer'
import {AppStateGlobalType} from '../../redux/redux-store'


class HeaderContainer extends React.Component<MapHeaderPropsType & DispatchHeaderPropsType> {

   render() {
      return (
         <Header {...this.props} />
      )
   }
}


let mapStateToProps = (state: AppStateGlobalType) => {
   return {
      isAuth: state.auth.isAuth,
      login: state.auth.login
   }
}


export default connect<MapHeaderPropsType,
   DispatchHeaderPropsType, {}, AppStateGlobalType>(
   mapStateToProps, {
      logout
   })(HeaderContainer)

// export default connect( mapStateToProps, {
//    getAuthUserData // - это короткая запись - тоже самое что написать
//- getAuthUserData: getAuthUserData
// } )( HeaderContainer );

