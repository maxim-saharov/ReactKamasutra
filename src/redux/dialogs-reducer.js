//
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {

   sidebar: [
      {id: 1, name: 'Tom'},
      {id: 2, name: 'Andrey'},
      {id: 3, name: 'Ivan'},
      {id: 4, name: 'Valera'},
   ],

   messages: [
      {id: 1, message: 'hi 11'},
      {id: 2, message: 'hi 2'},
      {id: 3, message: 'hi 3'},
   ]

}

const dialogsReducer = (state = initialState, action) => {

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
            messages: [...state.messages, newMessage],
         };


      default:
         return state;
   }
}

export const sendMessageCreator = (newMessageBody) => ({
   type: SEND_MESSAGE,
   newMessageBody})

export default dialogsReducer;
