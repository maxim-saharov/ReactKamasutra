//
import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {ErrorMessageWrapper, validateEmailField} from '../../utils/validators/validators'
import {connect} from 'react-redux'
import {login, ValueObjLoginType} from '../../redux/auth-reducer'
import {Navigate} from 'react-router-dom'
import StyleVal from '../../utils/validators/ErrorMessage.module.css'
import s from './Login.module.css'
import {AppStateGlobalType} from '../../redux/redux-store'

type PropsType = MapStatePropsType & MapDispatchPropsType;


type LoginFormValuesType = {
   email: string,
   password: string,
   rememberMe: boolean,
   general: string,
   captcha: null | string
}

const LoginPage: React.FC<PropsType> = (props) => {

   const validationSchema = Yup.object().shape({

      password: Yup.string()
         .min(2, 'Must be longer than 2 characters')
         .max(15, 'Must be shorter than 15 characters')
         .required('Required 2')
   })

   if (props.isAuth) {
      return <Navigate to={'/profile'} />
   }

   return (
      <div className={s.loginBlock}>
         <h2> ... Login page </h2>

         <Formik
            initialValues={{
               email: '',
               password: '',
               rememberMe: false,
               general: '',
               captcha: ''
            }}
            validate={validateEmailField}
            validationSchema={validationSchema}

            onSubmit={(
               values: LoginFormValuesType,
               bagWithMethods) => {

               let {setStatus, setFieldValue, setSubmitting} = bagWithMethods

               //debugger

               props.login(
                  values,
                  setStatus,
                  setFieldValue,
                  setSubmitting)

            }}
         >
            {(propsF) => {

               let {status, values, isSubmitting} = propsF

               //console.log( status );
               //console.log( values.general );
               //console.log( propsF.isSubmitting );

               return (
                  <Form>

                     <div>

                        {values.general &&
                        <div>
                           _.{values.general} - with setFieldValue
                        </div>}

                        {status &&
                        <div className={StyleVal.validationErrorMessage}>
                           ..{status}
                        </div>}

                        {status && props.captchaUrl &&
                        <div>

                           <div>
                              <img src={props.captchaUrl} alt={status} />
                           </div>

                           <div>
                              <Field
                                 name={'captcha'}
                                 type={'text'} />
                           </div>

                        </div>

                        }

                        <div>
                           <Field
                              name={'email'}
                              type={'text'}
                              placeholder={'e-mail'} />
                        </div>
                        <ErrorMessage name="email">
                           {ErrorMessageWrapper}
                        </ErrorMessage>

                        <div>
                           <Field
                              name={'password'}
                              type={'password'}
                              placeholder={'password'} />
                        </div>
                        <ErrorMessage name="password">
                           {ErrorMessageWrapper}
                        </ErrorMessage>

                        <div>
                           <Field
                              type={'checkbox'}
                              name={'rememberMe'}
                              id='rememberMe' />
                           <label htmlFor={'rememberMe'}> remember me </label>
                        </div>

                        <button type={'submit'}
                                disabled={isSubmitting}
                        >{isSubmitting ? 'Please wait...' : 'Submit'}</button>

                     </div>


                  </Form>
               )
            }
            }
         </Formik>

         <div>
            ...
         </div>


      </div>
   )
}


type MapStatePropsType = {
   isAuth: boolean,
   captchaUrl: string | null
}

const mapStateToProps = (state: AppStateGlobalType): MapStatePropsType => ({
      isAuth: state.auth.isAuth,
      captchaUrl: state.auth.captchaUrl
   }
)

type MapDispatchPropsType = {
   login: (values: ValueObjLoginType, setStatus: any, setFieldValue: any,
           setSubmitting: any) => void
};

type OwnPropsType = {}

const LoginPageConnect = connect<MapStatePropsType, MapDispatchPropsType,
   OwnPropsType, AppStateGlobalType>(mapStateToProps, {login})(LoginPage)

export default LoginPageConnect


//region Description
// так пишем если ошибку вывести без красного шрифта
// <ErrorMessage name="email" component="div" />

// lel = {errors, touched, isValid, dirty, status} = props;
//endregion

