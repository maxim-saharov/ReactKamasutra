//
import React, {useEffect, useState} from 'react'
import {Spin} from 'antd'
import {TextAreaOrInputOnChangeType} from '../../types/types'
import {outputDateSeconds, uniqueIdGetTimeInStringPlusIndex} from '../../utils/object-helpers'


export type ChatMessagesType = {
   message: string
   photo: string
   userId: number
   userName: string
}

const ChatPage: React.FC = () => {
   return (
      <div>
         <Chat />
      </div>
   )
}


const Chat: React.FC = () => {

   const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
   const [isWsChannelOpen, setIsWsChannelOpen] = useState(false)


   useEffect(() => {

      let ws: WebSocket

      const closeHandler = () => {
         console.log('close с addEventListener', outputDateSeconds())
         setIsWsChannelOpen(false)
         setTimeout(createChanel, 5000)
      }

      function createChanel() {

         if (ws !== undefined) {
            ws.removeEventListener('close', closeHandler)
            ws.close()
            console.log('просто удалили подписку', outputDateSeconds())
         }


         ws = new WebSocket(
            'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


         ws.addEventListener('close', closeHandler)

         setWsChannel(ws)

      }

      createChanel()

      return () => {
         ws.removeEventListener('close', closeHandler)
         ws.close()
      }

   }, [])


   return (
      <div>
         <Messages wsChannel={wsChannel} />
         <AddMessageForm
            wsChannel={wsChannel}
            setWsChannelOpen={setIsWsChannelOpen}
            isWsChannelOpen={isWsChannelOpen} />
      </div>
   )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

   const [messages, setMessages] = useState<ChatMessagesType[]>([])

   console.log(messages)

   useEffect(() => {

         const messageHandler = (e: MessageEvent) => {
            const newMassages = JSON.parse(e.data)

            setMessages((prevMessages) => [...prevMessages, ...newMassages])
         }

         wsChannel?.addEventListener('message', messageHandler)

         return () => {
            wsChannel?.removeEventListener('message', messageHandler)
         }

      }, [wsChannel]
   )

   return (
      <div style={{height: '400px', overflowY: 'auto'}}>
         {messages.map((m, index) => {
            const uniqueId = uniqueIdGetTimeInStringPlusIndex(index)
            return <MessageChat key={uniqueId} message={m} />
         })}
      </div>
   )
}


const MessageChat: React.FC<{ message: ChatMessagesType }> = ({message}) => {


   return (
      <div>
         <img src={message.photo} style={{width: '30px'}} alt={message.userName} />
         <b> {message.userName} - userId - {message.userId} </b>
         <br />
         {message.message}
         <hr />
      </div>
   )
}


const AddMessageForm: React.FC<{
   wsChannel: WebSocket | null
   setWsChannelOpen: any
   isWsChannelOpen: boolean
}> = ({wsChannel, setWsChannelOpen, isWsChannelOpen}) => {

   const [message, setMessage] = useState('')
   const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')


   console.log(readyStatus, outputDateSeconds())


   useEffect(() => {

      const openHandler = () => {
         console.log('open с addEventListener', outputDateSeconds())

         console.log(readyStatus)

         setReadyStatus('ready')

         setWsChannelOpen(true)
      }

      wsChannel?.addEventListener('open', openHandler)

      return () => {
         wsChannel?.removeEventListener('open', openHandler)
      }

// eslint-disable-next-line
   }, [wsChannel])


   //region Description
   const onChangeTextArea = (event: TextAreaOrInputOnChangeType) => {
      setMessage(event.target.value)
   }

   const onSendMassagesButton = () => {
      onSendMessage()
   }

   const onKeyPressInTextArea = (event: any) => {
      if (event.ctrlKey && event.code === 'Enter') {
         onSendMessage()
      }
   }

   const onSendMessage = () => {
      if (!message) {
         alert('Пустое сообщение невозможно отправить!')
         return
      }

      if (message.length > 100) {
         alert(
            `Можно отправлять не более 100 знаков,
            а сейчас уже ${message.length}`)
         return
      }

      wsChannel?.send(message)

      setMessage('')

   }

   const isDisabledButton = wsChannel === null
      || readyStatus !== 'ready'
      || !isWsChannelOpen


   const placeholderText =
      `Press Ctrl + Enter to send a message or button "Send".\nYou can't send more than 100 symbols.`
   //endregion


   return (
      <div>
         <div>
            <textarea
               style={{height: '100px', width: '250px'}}
               onChange={onChangeTextArea}
               value={message}
               placeholder={placeholderText}
               onKeyPress={onKeyPressInTextArea}
            />
         </div>

         <div>
            {isDisabledButton
               ? <Spin />
               : <button
                  onClick={onSendMassagesButton}>Send
               </button>
            }
         </div>
      </div>
   )
}


export default ChatPage


//текст длинной более 100 знаков и без косых здесь (тут спам - ааапппппппппннннннннпппппп) и тут конец
//console.log('ушли с компоненты AddMessageForm', outputDateSeconds())
