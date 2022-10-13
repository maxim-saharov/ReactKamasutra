//
import React from 'react'
import {useSelector} from 'react-redux'
import Preloader from '../common/Preloader/Preloader'
import {getIsFetching} from '../../redux/users-selectors'
import {Users} from './Users'
import s from './usersContainer.module.css'


type UserPagePropsType = {
   pageTitle: string
}

export const UserPage: React.FC<UserPagePropsType> = (props) => {

   const isFetching = useSelector(getIsFetching)

   return (
      <div className={s.usersWrapper}>
         <h2> {props.pageTitle}</h2>

         {isFetching ? <Preloader /> : null}

         <Users />
      </div>
   )

}

