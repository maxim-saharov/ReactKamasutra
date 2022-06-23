//
import {InferActionsTypes} from './redux-store'


type DialogType = {
   id: number,
   name: string
}

type MassageType = {
   id: number | string,
   message: string
}

let initialState = {

   sidebar: [
      {id: 1, name: 'Tom'},
      {id: 2, name: 'Andrey'},
      {id: 3, name: 'Ivan'},
      {id: 4, name: 'Valera'}
   ] as Array<DialogType>,

   messages: [
      {id: 1, message: 'hi 11'},
      {id: 2, message: 'hi 2'},
      {id: 3, message: 'hi 3'}
   ] as Array<MassageType>

}


export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>


const dialogsReducer = (
   state = initialState, action: ActionsType): InitialStateType => {

   switch (action.type) {

      case 'SN/DIALOGS/SEND_MESSAGE':
         let body = action.newMessageBody

         let nextIdMessages = state.messages.length + 1

         let newMessage = {
            id: nextIdMessages + body,
            message: body
         }

         return {
            ...state,
            messages: [...state.messages, newMessage]
         }


      default:
         return state
   }
}


export const actions = {

   sendMessage: (newMessageBody: string) => ({
      type: 'SN/DIALOGS/SEND_MESSAGE',
      newMessageBody
   } as const)

}


export default dialogsReducer
