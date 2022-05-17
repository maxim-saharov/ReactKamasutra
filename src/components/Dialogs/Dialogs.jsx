//
import React from "react";
import s from './Dialogs.module.css';
import DialogItems from "./DialogItems/DialogItems";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {ErrorMessageWrapper} from "../../utils/validators/validators";
import * as Yup from "yup";


const Dialogs = (props) => {

   let state = props.dialogsPage;

   let dialogsElement = state.sidebar.map( d => <DialogItems name={d.name} id={d.id} key={d.id} /> );

   let messagesElement = state.messages.map( m => <Message message={m.message} key={m.id} /> );


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

            <AddMassageForm sendMessage={props.sendMessage} />

         </div>

      </div>
   );
}


const AddMassageForm = (props) => {

   const validationSchema = Yup.object().shape( {

      newMessageBody: Yup.string()
         .min( 2, "Must be longer than 2 characters !" )
         .max( 5, "Must be shorter than 5 characters !" )
         .required( "Required !" )
   } );

   const addNewMessage = (values) => {

      props.sendMessage( values );

   }

   return (
      <Formik
         initialValues={{
            newMessageBody: ""
         }}
         validationSchema={validationSchema}
         onSubmit={(values, {resetForm}) => {
            addNewMessage( values.newMessageBody );
            resetForm( {values: ''} );
         }}
      >
         {() => (
            <Form>
               <div>
                  <Field
                     name={'newMessageBody'}
                     as={'textarea'}
                     placeholder={'enter text 2'}
                  />
               </div>
               <ErrorMessage name="newMessageBody">
                  {ErrorMessageWrapper}
               </ErrorMessage>

               <button type={'submit'}>Send</button>
            </Form>
         )}
      </Formik>
   )
}

export default Dialogs;


// так было раньше без формика
// onSubmit={(values) =>
// addNewMessage( values )
//
// <div>
//    <div>
//                   <textarea value={newMessageBody}
//                             onChange={onSendMessageChange}
//                             placeholder='enter text'>
//                   </textarea>
//    </div>
//
//    <div>
//       <button onClick={onSendMessageClick}>Send</button>
//    </div>
// </div>
//
// let onSendMessageClick = () => {
//    props.sendMessage();
// }
//
// если занулить не все нужно до делаем так
// resetForm( {
//    values: {
//       newMessageBody: ''
//    }
// } )
