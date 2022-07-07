//
import React, {FC} from 'react'
import s from './Dialogs.module.css'
import DialogItems from './DialogItems/DialogItems'
import Message from './Message/Message'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {ErrorMessageWrapper} from '../../utils/validators/validators'
import * as Yup from 'yup'
import {InitialStateType} from '../../redux/dialogs-reducer'


type DialogsPropsType = {
   dialogsPage: InitialStateType
   sendMessage: (newMessageBody: string) => void
}

const Dialogs: FC<DialogsPropsType> = (props) => {

   let state = props.dialogsPage

   let dialogsElement = state.sidebar.map(d => <DialogItems name={d.name} id={d.id} key={d.id} />)

   let messagesElement = state.messages.map(m => <Message message={m.message} key={m.id} />)


   return (
      <div className={s.dialogs}>

         <div className={s.dialogsItems}>
            {dialogsElement}
         </div>

         <div className={s.massages}>

            <div>{messagesElement}</div>

         </div>

         <AddMassageForm sendMessage={props.sendMessage} />

      </div>
   )
}


type AddMassageFormPropsType = {
   sendMessage: (newMessageBody: string) => void
}

const AddMassageForm: FC<AddMassageFormPropsType> = (props) => {

   const validationSchema = Yup.object().shape({

      newMessageBody: Yup.string()
         .min(2, 'Must be longer than 2 characters !')
         .max(100, 'Must be shorter than 100 characters !')
         .required('Required !')
   })

   const addNewMessage = (values: string) => {

      props.sendMessage(values)

   }

   return (
      <Formik
         initialValues={{
            newMessageBody: ''
         }}
         validationSchema={validationSchema}
         onSubmit={(values, {resetForm}) => {

            addNewMessage(values.newMessageBody)
            resetForm()
         }}
      >
         {() => (
            <Form>
               <div>
                  <Field
                     name={'newMessageBody'}
                     as={'textarea'}
                     placeholder={'Enter your message'}
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

export default Dialogs


//region Description
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


// type AddMassageFormValuesType = {
//    newMessageBody: string
// }
// values: AddMassageFormValuesType
// можно и не передавать оно само поняло что нужно

// если что то конкретное хотим сбросить то пишем так
// resetForm({values: {newMessageBody: ''}})
// а иначе оно скидывает до инициализационного состояния
// а иначе оно скидывает до инициализационного состояния, а ин до - это знаков уже с пробелами -100
//endregion


