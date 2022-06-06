//
import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";


let mapStateToPropsForRedirect = (state) => {
   return {
      isAuth: state.auth.isAuth
   }
}


export const WithAuthRedirect = (Component) => {

   class RedirectComponent extends React.Component {

      render() {

         if (!this.props.isAuth) {
            return <Navigate to={'/login'} />
         }

         return <Component {...this.props} />

      }
   }


   return connect( mapStateToPropsForRedirect )( RedirectComponent );

}


// это полный код для понимания но оно ругается на избыточную переменную
// let ConnectedAuthRedirectComponent = connect( mapStateToPropsForRedirect )( RedirectComponent );
// return ConnectedAuthRedirectComponent;

// или внутреннюю функцию можно функциональную сделать

// такая короткая запись была
// let mapStateToPropsForRedirect = (state) => ({
//    isAuth: state.auth.isAuth
// })

