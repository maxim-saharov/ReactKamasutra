//
import {Link} from 'react-router-dom'
import React from 'react'

import s from './NotFound.module.css'


export const NotFound: React.FC = () => {

   return (
      <div className={s.notFoundBlock}>
         <div> Page 404</div>
         <div>< br /></div>
         <div>
            <Link to='/'>
               Go to main page
            </Link>
         </div>
      </div>
   )
}