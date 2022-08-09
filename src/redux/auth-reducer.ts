//
import {ResultCodeEnum, ResultCodeForCaptchaEnum} from '../api/api'
import {authAPI} from '../api/auth-api'
import {securityAPI} from '../api/security-api'
import {BaseThunkType, InferActionsTypes} from './redux-store'


let initialState = {
   id: null as number | null,
   login: null as string | null,
   email: null as string | null,
   //isAuth: true
   isAuth: false as boolean,
   captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>
// так у Димыча
//type ThunkType = BaseThunkType<ActionsTypes | FormAction>


const authReducer = (
   state = initialState,
   action: ActionsType): InitialStateType => {

   switch (action.type) {

      case 'SN/auth/SET_USER_DATA':
      case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':

         return {
            //login55: true, // test
            ...state,
            //isAuth: 55,  // test
            ...action.payload
         }


      default:
         return state
   }

}


const actions = {

   setAuthUserData: (
      id: number | null, login: string | null,
      email: string | null, isAuth: boolean) => ({
      type: 'SN/auth/SET_USER_DATA',
      payload: {id, login, email, isAuth}
   }) as const,


   getCaptchaUrlSuccess: (captchaUrl: string) => ({
      type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
      payload: {captchaUrl}
   }) as const

}


// Ниже санки
export const getAuthUserData = (): ThunkType => async (dispatch) => {
   try {
      let meData = await authAPI.me()
      //meData.data.email  // тут видно как нам тс подсказывает

      if (meData.resultCode === ResultCodeEnum.Success) {
         let {id, login, email} = meData.data
         dispatch(actions.setAuthUserData(id, login, email, true))
      }

   } catch (error: any) {
      console.log(error.message)
   }
}


export const logout = (): ThunkType => async (dispatch) => {

   let response = await authAPI.logout()

   if (response.data.resultCode === 0) {

      dispatch(actions.setAuthUserData(null, null, null, false))
   }
}

export type ValueObjLoginType = {
   email: string, password: string, rememberMe: boolean,
   general: string, captcha: null | string
}

export const login = (
   values: ValueObjLoginType, setStatus: any, setFieldValue: any,
   setSubmitting: any): ThunkType => async (dispatch) => {

   let loginData = await authAPI.login(values)

   let resultCode = loginData.resultCode

   if (resultCode === ResultCodeForCaptchaEnum.Success) {

      await dispatch(getAuthUserData())

   } else {

      let textError = `resultCode: ${resultCode} - another mistake`

      if (loginData.messages && loginData.messages.length) {
         textError = `resultCode: ${resultCode} - ${loginData.messages.join()}`
      }


      if (resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {

         await dispatch(getCaptchaUrl())

         textError = `enter symbols from the picture`

      }

      setStatus(textError)
      setSubmitting(false)

   }

}


export const getCaptchaUrl = (): ThunkType => async (dispatch) => {

   const responseData = await securityAPI.getCaptchaAPI()

   const captchaUrl = responseData.url

   dispatch(actions.getCaptchaUrlSuccess(captchaUrl))

}

export default authReducer


//region Description
// так было с зенами
// export const getAuthUserData = () => (dispatch) => {
//
//    return authAPI.me()
//       .then( response => {
//
//          if (response.data.resultCode === 0) {
//             let {id, login, email} = response.data.data;
//             dispatch( setAuthUserData( id, login, email, true ) );
//          }
//       } );
//
//
// }

// let initialState = {
//    id: null as number| null,
//    login: null as string| null,
//    email: null as string| null,
//    //isAuth: true
//    isAuth: false,
//    captchaUrl: null as string| null
// }
//export type InitialStateType = typeof initialState;

// type SetAuthUserDataActionPayloadType = {
//    id: number | null, login: string | null,
//    email: string | null, isAuth: boolean
// }
//
// type SetAuthUserDataActionType = {
//    type: typeof SET_USER_DATA,
//    payload: SetAuthUserDataActionPayloadType
// };

// const setAuthUserData = (
//    id: number | null, login: string | null,
//    email: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
//    type: SET_USER_DATA,
//    payload: {id, login, email, isAuth}
// })


// type GetCaptchaUrlSuccessActionType = {
//
//    type: typeof GET_CAPTCHA_URL_SUCCESS,
//    payload: { captchaUrl: string }
//
// }

// const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
//    type: GET_CAPTCHA_URL_SUCCESS,
//    payload: {captchaUrl}
// })

// это полная версия - но она выглядит что как бы код дублируем
// export type InitialStateType = {
//    id: number | null
//    login: string | null
//    email: string | null
//    isAuth: boolean
//    captchaUrl: string | null
// }
//endregion











