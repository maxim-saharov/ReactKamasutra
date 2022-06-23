//
import s from './Post.module.css'
import React from 'react'

type PropsType = {
   value: string
   likesCount: number
}

const Post: React.FC<PropsType> = (props) => {

   return (

      <div className={s.item}>
         <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4AuCaCDS8eeLRXGL0pFD9cIddYuHc8AJoSA&usqp=CAU'
            alt={'Post-illustration'}
         />
         ... {props.value}
         <div>
            Like {props.likesCount}
         </div>
      </div>

   )
}

export default Post