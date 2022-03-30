//
import React from "react";
import {connect} from "react-redux";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";


let mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
   }
}


let mapDispatchToProps = (dispatch) => {

   let onUpdateNewMessageBody = (body) => {
      dispatch( updateNewMessageBodyCreator( body ) )
   }

   return {

      updateNewMessageBody: onUpdateNewMessageBody,

      sendMessage: () => {
         dispatch( sendMessageCreator() );

      }
   }
}

const DialogsContainer = connect( mapStateToProps, mapDispatchToProps )( Dialogs );

export default DialogsContainer;


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
