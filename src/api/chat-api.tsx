//

import {outputDateSeconds} from '../utils/object-helpers'

export type ChatMessagesApiType = {
   message: string
   photo: string
   userId: number
   userName: string
}

export type MassagesReceivedSubscriberType =
   (messages: ChatMessagesApiType[]) => void

export type StatusTypeChatApi = 'pending' | 'ready' | 'error'


type StatusChangedSubscriberType = (status: StatusTypeChatApi) => void

type EventsNameType = 'messages-received' | 'status-changed'


let ws: WebSocket | null = null

const subscribers = {
   'messages-received': [] as MassagesReceivedSubscriberType[],
   'status-changed': [] as StatusChangedSubscriberType[]
}

let count = 1

const notifySubscribersAboutStatus = (status: StatusTypeChatApi) => {
   subscribers['status-changed'].forEach(s => s(status))
}


const errorHandler = () => {
   notifySubscribersAboutStatus('error')
   console.log('Ошибка установить соединение!', outputDateSeconds())
}

const openHandler = () => {
   console.log('открылось соединение!',
      outputDateSeconds(),
      ', счетчик открытий - ' + count,
      ', статус - ' + ws?.readyState)
   count = count + 1
}
const messageHandler = (e: MessageEvent) => {

   const newMassages = JSON.parse(e.data)
   subscribers['messages-received'].forEach(s => s(newMassages))
   notifySubscribersAboutStatus('ready')
   console.log('получили массив данных с сервера!', outputDateSeconds())
}

const closeHandler = () => {
   console.log('закрылось соединение!', outputDateSeconds())
   notifySubscribersAboutStatus('pending')
   setTimeout(createChanel, 2000)
}


const cleanUp = () => {
   ws?.removeEventListener('error', errorHandler)
   ws?.removeEventListener('open', openHandler)
   ws?.removeEventListener('message', messageHandler)
   ws?.removeEventListener('close', closeHandler)
   console.log('удалили все подписки!', outputDateSeconds())
}


function createChanel() {
   notifySubscribersAboutStatus('pending')

   if (ws !== null) {
      setTimeout(() => {
         cleanUp()
         console.log('статус - ' + ws?.readyState, outputDateSeconds())
         ws?.close()
         console.log('статус - ' + ws?.readyState, outputDateSeconds())
      }, 500)
   }


   setTimeout(() => {
      console.log('статус - ' + ws?.readyState, outputDateSeconds())
      ws = new WebSocket(
         'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('error', errorHandler)
      ws.addEventListener('open', openHandler)
      ws.addEventListener('message', messageHandler)
      ws.addEventListener('close', closeHandler)
   }, 1000)

}


export const chatAPI = {

   start() {
      createChanel()
   },

   stop() {
      subscribers['messages-received'] = []
      subscribers['status-changed'] = []
      cleanUp()
      ws?.close()
   },


   subscribe(eventName: EventsNameType,
             callback: MassagesReceivedSubscriberType | StatusChangedSubscriberType) {
      // @ts-ignore
      subscribers[eventName].push(callback)
      return () => {
         // @ts-ignore
         subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
      }
   },

   unsubscribe(eventName: EventsNameType,
               callback: MassagesReceivedSubscriberType | StatusChangedSubscriberType) {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
   },

   sendMessageApi(message: string) {
      ws?.send(message)
      createChanel()
   }
}


// let array2 = [
//    {
//       message: '130',
//       photo: 'https://social-network.samuraijs.com/activecontent/images/users/23275/user-small.jpg?v=12',
//       userId: 23275,
//       userName: 'Maxim Saharov'
//    },
// ]




