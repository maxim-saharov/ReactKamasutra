//
import React from 'react'
import styles from './users.module.css'
import userPhoto from '../../assets/images/user2.jpg'
import {NavLink} from 'react-router-dom'
import {UserType} from '../../types/types'

type PropsType = {
   user: UserType
   followingInProgress: Array<number>
   unfollow: (userId: number) => void
   follow: (userId: number) => void
}

let User: React.FC<PropsType> = (props) => {

   let user = props.user


   return (
      <div>
         <span>
            <div>
               <NavLink to={'/profile/' + user.id}>
                  <img src={user.photos.small !== null
                     ? user.photos.small
                     : userPhoto}
                       className={styles.userPhoto}
                       alt={'fff'} />
               </NavLink>
            </div>

            <div>
               {user.followed
                  ?
                  <button
                     disabled={
                        props.followingInProgress.some(id => id === user.id)}
                     onClick={() => {

                        props.unfollow(user.id)

                     }}>
                     Unfollow
                  </button>

                  :
                  <button
                     disabled={props.followingInProgress.some(id => id === user.id)}
                     onClick={() => {

                        props.follow(user.id)

                     }}>
                     Follow
                  </button>}
            </div>
         </span>

         <span>
            <span>
               <div>
                  {user.name}
               </div>
               <div>
                  {user.status}
               </div>
            </span>

            <span>
               <div>
                  {'user.location.country'}
               </div>
               <div>
                  {'user.location.city'}
               </div>
            </span>
         </span>

      </div>)
}


export default User





