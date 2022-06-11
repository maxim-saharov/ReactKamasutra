//
import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {ErrorMessageWrapper, validateEmailField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import StyleVal from '../../utils/validators/ErrorMessage.module.css';
import s from './Login.module.css';


const LoginPage = (props) => {

   const validationSchema = Yup.object().shape( {

      password: Yup.string()
         .min( 2, "Must be longer than 2 characters" )
         .max( 15, "Must be shorter than 15 characters" )
         .required( "Required 2" )
   } );

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

            onSubmit={(values, bagWithMethods) => {

               let {setStatus, setFieldValue, setSubmitting} = bagWithMethods;

               //debugger

               props.login(
                  values,
                  setStatus,
                  setFieldValue,
                  setSubmitting );

            }}
         >
            {(propsF) => {

               let {status, values, isSubmitting} = propsF;

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
                                 <img src={props.captchaUrl} alt={status}/>
                              </div>

                              <div>
                                 <Field
                                    name={'captcha'}
                                    type={'text'}/>
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
                        >{isSubmitting ? "Please wait..." : "Submit"}</button>

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


const mapStateToProps = (state) => ({
      isAuth: state.auth.isAuth,
      captchaUrl: state.auth.captchaUrl
   }
);

const LoginPageConnect = connect( mapStateToProps, {login} )( LoginPage );

export default LoginPageConnect;

// так пишем если ошибку вывести без красного шрифта
// <ErrorMessage name="email" component="div" />

// lel = {errors, touched, isValid, dirty, status} = props;

