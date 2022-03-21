import React from "react";
import s from './Dialogs.module.css';
import DialogItems from "./DialogItems/DialogItems";
import Message from "./Message/Message";


const Dialogs = (props) => {

   let dialogsElement = props.state.sidebar.map( d => <DialogItems name={d.name} id={d.id} /> );

   let messagesElement = props.state.messages.map( m => <Message message={m.message} /> );

   return (
      <div className={s.dialogs}>

         <div className={s.dialogsItems}>
            {dialogsElement}
         </div>

         <div className={s.massages}>
            {messagesElement}
         </div>

      </div>
   );
}

export default Dialogs;