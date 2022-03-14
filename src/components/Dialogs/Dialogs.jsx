import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItems = (props) => {
   return (
      <div className={s.dialog}>
         <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
      </div>
   )
}

const Message = (props) => {
   return(
      <div className={s.massage}>{props.message}</div>
   )
}

const Dialogs = () => {
   return (
      <div className={s.dialogs}>

         <div className={s.dialogsItems}>
            <DialogItems name='Dima' id='11'/>
            <DialogItems name='Andrey' id='22'/>
            <DialogItems name='Sveta' id='33'/>
            <DialogItems name='Valera' id='44'/>
         </div>

         <div className={s.massages}>
            <Message message='hi 1'/>
            <Message message='hi 2'/>
            <Message message='hi 3'/>
         </div>

      </div>
   );
}

export default Dialogs;
