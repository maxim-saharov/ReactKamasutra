//
import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Header.module.css'


export type MapHeaderPropsType = {
   isAuth: boolean
   login: string | null
}

export type DispatchHeaderPropsType = {
   logout: () => void
}

const Header: React.FC<MapHeaderPropsType & DispatchHeaderPropsType> = (props) => {
   return (
      <header className={s.header}>

         <img src='https://www.logodesign.net/images/illustration-logo.png'
              alt={'header-illustration-logo'}
         />

         {props.isAuth
            ?
            <span className={s.loginBlockIsAuth}>
                  {props.login} - <button onClick={props.logout}>
                  Log out</button>
            </span>
            :
            <NavLink
               className={s.loginBlockNotAuth} to={'/login'}
            >Login</NavLink>
         }

      </header>
   )
}

export default Header
