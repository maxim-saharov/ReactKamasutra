import React from 'react'
import {ErrorMessageWrapper} from '../../../utils/validators/validators'
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik'
import * as Yup from 'yup'
import Style from './ProfileInfo.module.css'
import StyleVal from '../../../utils/validators/ErrorMessage.module.css'
import {ProfileType} from '../../../types/types'

const validationSchema = Yup.object().shape({

   fullName: Yup.string()
      .min(2, 'Must be longer than 2 characters !')
      .max(25, 'Must be shorter than 5 characters !')
      .required('Required !'),

   lookingForAJobDescription: Yup.string()
      .min(2, 'Must be longer than 2 characters !')
      .max(50, 'Must be shorter than 5 characters !')
      .required('Required !'),

   aboutMe: Yup.string()
      .min(2, 'Must be longer than 2 characters !')
      .max(50, 'Must be shorter than 5 characters !')
      .required('Required !')

})

let contactsJsx = (name: string) => {
   return (
      <div key={name} className={Style.contact}>
         <div>
            <b>{name}</b>:
         </div>

         <div>
            <Field
               name={`contacts.${name}`}
               type={'text'}
               id={name}
               placeholder={name}
            />
         </div>
      </div>)
}

type PropsType = {
   profile: ProfileType
   handleSubmit: (formData: ProfileType, setStatus: any,
                  setSubmitting: any, goToViewMode: any) => void
   goToViewMode: any
}

const ProfileDataForm: React.FC<PropsType> = (props) => {

   let {profile, handleSubmit, goToViewMode} = props

   let objectFromApiCopy = JSON.parse(JSON.stringify(profile))

   const arrayWithNames = Object.keys(profile.contacts)

   arrayWithNames.forEach((item) => {
      let value = objectFromApiCopy.contacts[item]
      if (value === null) {
         objectFromApiCopy.contacts[item] = ''
      }
   })


   return (
      <div>

         <div>
            ...
         </div>

         <Formik
            initialValues={objectFromApiCopy}
            validationSchema={validationSchema}
            onSubmit={(values, bagWithMethods) => {
               let {setStatus, setSubmitting} = bagWithMethods

               handleSubmit(values, setStatus, setSubmitting, goToViewMode)
            }}
         >
            {(propsF) => {

               let {status, isSubmitting} = propsF

               return (
                  <Form>

                     <div>
                        <Field
                           name={'fullName'}
                           type={'text'}
                           placeholder={'Full name'}
                        />
                     </div>
                     <ErrorMessage name="fullName">
                        {ErrorMessageWrapper}
                     </ErrorMessage>

                     <div>< br /></div>

                     <div>
                        <Field
                           name={'lookingForAJob'}
                           type={'checkbox'}
                           id='lookingForAJob' />
                        <label htmlFor={'lookingForAJob'}>
                           <b> Looking for a job</b> </label>
                     </div>

                     <div>< br /></div>

                     <div>
                        <Field
                           name={'lookingForAJobDescription'}
                           as={'textarea'}
                           placeholder={'My professional skills'}
                        />
                     </div>
                     <ErrorMessage name="lookingForAJobDescription">
                        {ErrorMessageWrapper}
                     </ErrorMessage>

                     <div>< br /></div>

                     <div>
                        <Field
                           name={'aboutMe'}
                           as={'textarea'}
                           placeholder={'About me'}
                        />
                     </div>
                     <ErrorMessage name="aboutMe">
                        {ErrorMessageWrapper}
                     </ErrorMessage>

                     <div>< br /></div>

                     <div>
                        <b>Contacts</b>:
                     </div>

                     <FieldArray
                        name="friends"
                        render={() => (
                           <div>
                              {arrayWithNames.map(name => contactsJsx(name))}
                           </div>
                        )}
                     />

                     <div>< br /></div>

                     {status &&
                     <div className={StyleVal.validationErrorMessage}>
                        <b> ..{status} - with setStatus </b>
                     </div>}

                     <button type={'submit'}
                             disabled={isSubmitting}
                     >{isSubmitting ? 'Please wait...' : 'Save'}
                     </button>

                     <button onClick={goToViewMode}
                             type={'button'}
                             className={Style.buttonCancel}> Cancel
                     </button>

                  </Form>
               )
            }}
         </Formik>


         <div>
            ...
         </div>

         <div>
            < br />
         </div>


      </div>)
}

export default ProfileDataForm
