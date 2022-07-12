//
import {BaseThunkType, InferActionsTypes} from './redux-store'
import {chatAPI, ChatMessagesApiType, MassagesReceivedSubscriberType, StatusTypeChatApi} from '../api/chat-api'
import {Dispatch} from 'redux'
import {uniqueIdGetTimeInStringPlusIndex} from '../utils/object-helpers'


type ChatMessagesType = ChatMessagesApiType & {
   id: string
}


let initialState = {
   messages: [] as ChatMessagesType[],
   status: 'pending' as StatusTypeChatApi
}


type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsType>


const chatReducer = (
   state = initialState,
   action: ActionsType): InitialStateType => {

   switch (action.type) {

      case 'SN/chat/MESSAGES_RECEIVED':

         //region Description
         const messagesPayloadWithId = action.payload.messages.map(
            (m, index) => {
               const uniqueId = uniqueIdGetTimeInStringPlusIndex(index)
               return (
                  {...m, id: uniqueId})
            }
         )

         const messagesCompose = [...state.messages, ...messagesPayloadWithId]

         const messagesLast100pieces = messagesCompose.filter((m, index, array) =>
            index >= array.length - 100)

         //endregion

         return {
            ...state,
            messages: messagesLast100pieces
         }


      case
      'SN/chat/STATUS_CHANGED'
      :

         return {
            ...state,
            status: action.payload.status
         }

      default:
         return state
   }

}


const actions = {

   messagesReceived: (messages: ChatMessagesApiType[]) => ({
      type: 'SN/chat/MESSAGES_RECEIVED',
      payload: {messages}
   }) as const,

   statusChanged: (status: StatusTypeChatApi) => ({
      type: 'SN/chat/STATUS_CHANGED',
      payload: {status}
   }) as const

}


// Ниже санки и другое

let _newMessagesHandler: MassagesReceivedSubscriberType | null = null

const newMessagesHandlerCreator = (dispatch: Dispatch) => {

   if (_newMessagesHandler === null) {
      _newMessagesHandler = (messages) => {
         dispatch(actions.messagesReceived(messages))
      }
   }
   return _newMessagesHandler
}


let _statusChangedHandler: ((status: StatusTypeChatApi) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {

   if (_statusChangedHandler === null) {
      _statusChangedHandler = (status) => {
         dispatch(actions.statusChanged(status))
      }
   }
   return _statusChangedHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {

   chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
   chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))

   chatAPI.start()

}


export const stopMessagesListening = (): ThunkType => async () => {

   // chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
   // chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))

   chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async () => {

   chatAPI.sendMessageApi(message)
}

export default chatReducer












