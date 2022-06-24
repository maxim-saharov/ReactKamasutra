
import {getAuthUserData} from './auth-reducer'
import {BaseThunkType, InferActionsTypes} from './redux-store'

let initialState = {
   initialized: false
}

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>


const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

   switch (action.type) {

      case 'SN/APP/INITIALIZED_SUCCESS':

         return {
            ...state,
            initialized: true
         }

      default:
         return state
   }
}


export const actions = {
   initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}


export const initializeApp = (): ThunkType => async (dispatch) => {

   let promise = dispatch(getAuthUserData())


   Promise.all([promise])
      .then(() => {
            dispatch(actions.initializedSuccess())
         }
      )

}


export default appReducer


//region Description
// let initialState = {
//    initialized: false
//    // сюда можем записывать глабальныу ошибку
//    //globalError: null
// }

// let fruit = 'Banana' as const
// //fruit = 'Banana2'
// // хоть и let все равно фиксированный тип константа - только
// // 'Banana' может быть
//
// const user = {
//    name: 'John',
//    role: 'admin'
// } as const
//
// //user.name = 'John'
// // ругается так как автоматом делает еще и readonly
//
// const list = ['one', 'two', 3, 4] as const
// //list[0] = 'one2'
// // ругается так как автоматом делает еще и readonly
//
// //и такой пример
// const colors = [
//    {color: 'red', code: {rgb: [255, 0, 0], hex: '#FF0000'}},
//    {color: 'green', code: {rgb: [0, 255, 0], hex: '#00FF00'}},
//    {color: 'blue', code: {rgb: [0, 0, 255], hex: '#0000FF'}}
// ] as const
// //colors[0].color=55
// // ругается так как автоматом делает еще и readonly
// // тоесть ничего никто не сможет поменять
//endregion
