//
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
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
   ],

   newMessageBody: 'test'
}

const dialogsReducer = (state = initialState, action) => {

   switch (action.type) {

      case UPDATE_NEW_MESSAGE_BODY:
         state.newMessageBody = action.body;
         return state;


      case SEND_MESSAGE:
         let body = state.newMessageBody;

         let newMessage = {
            id: 77,
            message: body,
         };

         state.messages.push( newMessage );
         state.newMessageBody = '';
         return state;


      default:
         return state;
   }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})

export const updateNewMessageBodyCreator = (body) => ({
   type: UPDATE_NEW_MESSAGE_BODY,
   body: body
})

export default dialogsReducer;
