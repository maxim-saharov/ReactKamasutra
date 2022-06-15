//
import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';

const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

// это полная версия - но она выглядит что как бы код дублируем
export type InitialStateType = {
   id: number | null
   login: string | null
   email: string | null
   isAuth: boolean
   captchaUrl: string | null
}


let initialState = {
   id: null,
   login: null,
   email: null,
   //isAuth: true
   isAuth: false,
   captchaUrl: null
}


// let initialState = {
//    id: null as number| null,
//    login: null as string| null,
//    email: null as string| null,
//    //isAuth: true
//    isAuth: false,
//    captchaUrl: null as string| null
// }

//export type InitialStateType = typeof initialState;

const authReducer = (
   state: InitialStateType = initialState,
   action: any): InitialStateType => {

   switch (action.type) {

      case SET_USER_DATA:
      case GET_CAPTCHA_URL_SUCCESS:

         return {
            //login55: true,
            // сейчас тут пока вообще не работает типизация
            // и Димыч не знает почему!
            ...state,
            //isAuth: 55, // это тесть динамич. типизации
            ...action.payload,

         }


      default:
         return state;
   }

}


type SetAuthUserDataActionPayloadType = {
   id: number | null, login: string | null,
   email: string | null, isAuth: boolean
}

type SetAuthUserDataActionType = {
   type: typeof SET_USER_DATA,
   payload: SetAuthUserDataActionPayloadType
};

const setAuthUserData = (
   id: number | null, login: string | null,
   email: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
   type: SET_USER_DATA,
   payload: {id, login, email, isAuth}
});


type GetCaptchaUrlSuccessActionType = {

   type: typeof GET_CAPTCHA_URL_SUCCESS,
   payload: { captchaUrl: string }

}

const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   payload: {captchaUrl}
});


// Ниже санки
export const getAuthUserData = () => async (dispatch: any) => {


   try {

      let response = await authAPI.me();

      if (response.data.resultCode === 0) {
         let {id, login, email} = response.data.data;
         dispatch(setAuthUserData(id, login, email, true));
      }

   } catch (error: any) {

      console.log(error.response.status);
      console.log(error);
   }


}


export const logout = () => async (dispatch: any) => {

   let response = await authAPI.logout();

   if (response.data.resultCode === 0) {

      dispatch(setAuthUserData(null, null, null, false));
   }
}

type ValuesType = {
   email: string, password: string, rememberMe: boolean,
   general: string, captcha: string
}

export const login = (
   values: ValuesType, setStatus: any, setFieldValue: any,
   setSubmitting: any) => async (dispatch: any) => {

   let response = await authAPI.login(values);

   let resultCode = response.data.resultCode;

   if (resultCode === 0) {

      dispatch(getAuthUserData());

   } else {

      let textError = `resultCode: ${resultCode} - another mistake`;

      if (response.data.messages && response.data.messages.length) {
         textError = `resultCode: ${resultCode} - ${response.data.messages.join()}`;
      }


      if (resultCode === 10) {

         dispatch(getCaptchaUrl())

         textError = `enter symbols from the picture`;

      }

      setStatus(textError);
      setSubmitting(false);

   }


}


export const getCaptchaUrl = () => async (dispatch: any) => {

   const response = await securityAPI.getCaptchaAPI();

   const captchaUrl = response.data.url;

   dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export default authReducer;


// бак было с зенами
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











