//
import React from "react";
import s from './Dialogs.module.css';
import DialogItems from "./DialogItems/DialogItems";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";


const Dialogs = (props) => {

   let state = props.dialogsPage;

   let dialogsElement = state.sidebar.map( d => <DialogItems name={d.name} id={d.id} key={d.id} /> );

   let messagesElement = state.messages.map( m => <Message message={m.message} key={m.id} /> );

   let newMessageBody = state.newMessageBody;


   let onSendMessageChange = (e) => {
      let body = e.target.value;
      props.updateNewMessageBody( body );
   }


   let onSendMessageClick = () => {
      props.sendMessage();

   }

   if (!props.isAuth) {
      return <Navigate to={'/login'} />
   }

   return (
      <div className={s.dialogs}>

         <div className={s.dialogsItems}>
            {dialogsElement}
         </div>

         <div className={s.massages}>

            <div>{messagesElement}</div>


            <div>
               <div>
                  <textarea value={newMessageBody}
                            onChange={onSendMessageChange}
                            placeholder='enter text'>
                  </textarea>
               </div>

               <div>
                  <button onClick={onSendMessageClick}>Send</button>
               </div>
            </div>


         </div>

      </div>
   );
}

export default Dialogs;