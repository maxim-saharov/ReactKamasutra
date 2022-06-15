//
const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType = {
   id: number,
   name: string
}

type MassageType = {
   id: number,
   message: string
}

let initialState = {

   sidebar: [
      {id: 1, name: 'Tom'},
      {id: 2, name: 'Andrey'},
      {id: 3, name: 'Ivan'},
      {id: 4, name: 'Valera'},
   ] as Array<DialogType>,

   messages: [
      {id: 1, message: 'hi 11'},
      {id: 2, message: 'hi 2'},
      {id: 3, message: 'hi 3'},
   ] as Array<MassageType>

}


export type InitialStateType = typeof initialState;

const dialogsReducer = (
   state = initialState, action: any): InitialStateType => {

   switch (action.type) {

      case SEND_MESSAGE:
         let body = action.newMessageBody;

         let nextIdMessages = state.messages.length + 1

         let newMessage = {
            id: nextIdMessages + body,
            message: body,
         };

         return {
            ...state,
            messages: [...state.messages, newMessage]
         };


      default:
         return state;
   }
}


type SendMessageCreatorActionType = {
   type: typeof SEND_MESSAGE,
   newMessageBody: string
}

export const sendMessageCreator = (
   newMessageBody: string): SendMessageCreatorActionType => ({
   type: SEND_MESSAGE,
   newMessageBody
})


export default dialogsReducer;
