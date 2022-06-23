//
import React from 'react'
import {connect} from 'react-redux'
import {actions} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {compose} from 'redux'
import {AppStateGlobalType} from '../../redux/redux-store'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'


let mapStateToProps = (state: AppStateGlobalType) => {
   return {
      dialogsPage: state.dialogsPage
   }
}


const DialogsContainer = compose<React.ComponentType>(
   connect(mapStateToProps, {...actions}),
   withAuthRedirect
)(Dialogs)

export default DialogsContainer


//region Description
// так было без compose
//let AuthRedirectComponent = WithAuthRedirect( Dialogs );
//
// const DialogsContainer = connect( mapStateToProps, mapDispatchToProps )( AuthRedirectComponent );

// так было без хок функции общей
// let AuthRedirectComponent = (props) => {
//
//    if (!props.isAuth) {
//       return <Navigate to={'/login'} />
//    }
//    return <Dialogs {...props} />
// }

// можно так сделать - как по мне так более понятнее
// или как Дима сразу засунуть в сф
// let onSendMessageClick = () => {
//    dispatch( sendMessageCreator() )
// }
// в ретурне это
// updateNewMessageBody: (body) => {
//    dispatch( updateNewMessageBodyCreator( body ) );
// },
//sendMessage: onSendMessageClick

// const DialogsContainer_Old = () => {
//
//    return (
//
//       <StoreContext_Non.Consumer>{
//          (store) => {
//
//             let state = store.getState().dialogsPage;
//
//             let onSendMessageChange = (body) => {
//                store.dispatch( updateNewMessageBodyCreator( body ) )
//             }
//
//             let onSendMessageClick = () => {
//                store.dispatch( sendMessageCreator() )
//             }
//
//             return (
//                <Dialogs
//                   updateNewMessageBody={onSendMessageChange}
//                   sendMessage={onSendMessageClick}
//                   dialogsPage={state}
//                />
//             )
//          }
//       }
//       </StoreContext_Non.Consumer>
//    )
// }

// так было
// let mapDispatchToProps = (dispatch) => {
//
//    return {
//
//       sendMessage: (newMessageBody) => {
//          dispatch( actions.sendMessage( newMessageBody ) );
//
//       }
//    }
// }
//endregion
