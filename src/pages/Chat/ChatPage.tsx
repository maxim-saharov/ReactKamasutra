//
import React, {UIEvent, useEffect, useRef, useState} from 'react'
import {Spin} from 'antd'
import {TextAreaOrInputOnChangeType} from '../../types/types'
import {outputDateSeconds} from '../../utils/object-helpers'
import {useDispatch, useSelector} from 'react-redux'
import {selectIsAuth} from '../../redux/auth-selectors'
import {ChatMessagesApiType} from '../../api/chat-api'
import {sendMessage, startMessagesListening, stopMessagesListening} from '../../redux/chat-reducer'
import {AppStateGlobalType} from '../../redux/redux-store'


const ChatPage: React.FC = () => {

   const isAuth = useSelector(selectIsAuth)

   return (
      <div>
         <div>
            {isAuth
               ? <Chat />
               : <AddMessageForm
                  isAuth={isAuth} />
            }
         </div>

      </div>
   )
}


const Chat: React.FC = () => {

   const dispatch = useDispatch()

   const status = useSelector((state: AppStateGlobalType) => state.chat.status)


   useEffect(() => {

      console.log('старт', outputDateSeconds())

      dispatch(startMessagesListening())

      return () => {
         dispatch(stopMessagesListening())
      }

   }, [dispatch])


   return (
      <div>

         {status === 'error'
         && <div> Some error occurred. Please refresh the page </div>}

         <>
            <Messages />
            <AddMessageForm
               isAuth={true} />
         </>

      </div>
   )
}


const Messages: React.FC = () => {

   console.log('>>>Messages')

   const messages = useSelector((state: AppStateGlobalType) => state.chat.messages)

   const messagesAnchorRef = useRef<HTMLDivElement>(null)

   const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)

   const onScrollHandler = (e: UIEvent<HTMLDivElement>) => {

      const element = e.currentTarget

      let differenceWhatWeSee = element.scrollHeight - element.scrollTop
      //element.scrollHeight - высота всей таблицы пикселей - 3800 например
      // element.scrollTop - сколько сейчас в
      // верхней точке длинна пикселей - 3400 например
      // прокрутка вверх то тут уже 3300 и разница уже 500 пикселей


      let value = Math.abs(differenceWhatWeSee - element.clientHeight)
      //let value = differenceWhatWeSee - element.clientHeight
      // element.clientHeight - всегда как у див тоесть = 400
      // 500 - 400 = 100

      if (value < 300) {
         if (!isAutoScrollActive) {

            setIsAutoScrollActive(true)
            //console.log('Включили автоскролл')
         }

      } else {
         if (isAutoScrollActive) {
            setIsAutoScrollActive(false)
            //console.log('ВЫКЛЮЧИЛИ автоскролл')
         }
      }

      // console.log(element.scrollHeight, element.scrollTop,
      //    differenceWhatWeSee, element.clientHeight, value)

   }

   useEffect(() => {

      if (isAutoScrollActive) {
         setTimeout(() => {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
         }, 500)
      }
      // eslint-disable-next-line
   }, [messages])


   return (
      <div style={{height: '400px', overflowY: 'auto'}} onScroll={onScrollHandler}>
         {messages.map((m) => {
            return <MessageChat key={m.id} message={m} />
         })}
         <div ref={messagesAnchorRef}>
         </div>
      </div>
   )
}


const MessageChat: React.FC<{ message: ChatMessagesApiType }> = ({message}) => {
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


const AddMessageForm: React.FC<{ isAuth: boolean }> = ({isAuth}) => {

   const [message, setMessage] = useState('')

   const status = useSelector((state: AppStateGlobalType) => state.chat.status)

   const dispatch = useDispatch()


   //region Description
   const onChangeTextArea = (event: TextAreaOrInputOnChangeType) => {
      setMessage(event.target.value)
   }

   const onSendMassagesButton = () => {
      onSendMessage()
   }

   const isDisabledButton = status !== 'ready'


   const onKeyPressInTextArea = (event: any) => {

      if (event.ctrlKey && event.code === 'Enter') {

         if (isDisabledButton) {

            console.log(
               'хотел отправить сообщение через Ctrl + Enter в момент подключения')
            return

         } else {
            onSendMessage()
         }


      }
   }

   const onSendMessage = () => {

      if (!message) {
         alert('Пустое сообщение невозможно отправить!')
         return
      }

      const date = new Date()
      const time = String(
         date.getHours()
         + ':' + date.getMinutes()
      )

      const messageWithTime = `${message} (${time})`

      if (messageWithTime.length > 100) {
         alert(
            `Можно отправлять не более 100 знаков,
            а сейчас уже ${messageWithTime.length}`)
         return
      }

      console.log('отправили сообщение', outputDateSeconds())

      dispatch(sendMessage(messageWithTime))

      setMessage('')

   }


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
            {isAuth
               ? ''
               : 'Chat works only for login users!'

            }
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
//текст длинной более 92 знаков и без косых здесь (тут спам - аааппппппп5ппнннннннппппп) и тут
//console.log('реф2', outputDateSeconds())
