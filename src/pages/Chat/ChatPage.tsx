//
import React, {useEffect, useState} from 'react'
import {TextAreaOrInputOnChangeType} from '../../types/types'


const wsChannel = new WebSocket(
   'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

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

   return (
      <div>
         <Messages />
         <AddMessageForm />
      </div>
   )
}

const Messages: React.FC = () => {

   const [messages, setMessages] = useState<ChatMessagesType[]>([])

   useEffect(() => {

         wsChannel.addEventListener('message', (e: MessageEvent) => {
               const dataArray = JSON.parse(e.data)

               setMessages((prevMessages) => [...prevMessages, ...dataArray])
            }
         )

      }, []
   )

   return (
      <div style={{height: '400px', overflowY: 'auto'}}>
         {messages.map((m, index) => <MessageChat key={index} message={m} />)}
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


const AddMessageForm: React.FC = () => {

   const [message, setMessage] = useState('')

   const onChangeTextArea = (event: TextAreaOrInputOnChangeType) => {

      setMessage(event.target.value)
   }

   const sendMassages = () => {

      if (!message) {
         return
      }

      wsChannel.send(message)

      setMessage('')
   }

   return (
      <div>
         <div>
            <textarea
               onChange={onChangeTextArea}
               value={message}
            />
         </div>

         <div>
            <button onClick={sendMassages}>Send</button>
         </div>

      </div>
   )
}


export default ChatPage


// {
//    message: "asdasd",
//       photo:        "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=4",
//    userId: 2,
//    userName: "samurai "
// }

// message: "Привет, есть тут кто ?)2"
// photo: "https://social-network.samuraijs.com/activecontent/images/users/23275/user-small.jpg?v=12"
// userId: 23275
// userName: "Maxim Saharov"