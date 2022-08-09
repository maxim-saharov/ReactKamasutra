//
import React from 'react'
import s from './Home.module.css'


export const Home: React.FC = () => {

   return (
      <div >
         <span className={s.redColor}>  From Ukraine watch with VPN.</span>
         <br />
         Registration and other functional works. Who wants to see,
         please write to me at Linkedin<br />
         <a
            href='https://www.linkedin.com/in/maxim-saharov/'
            target='_blank'
            rel='noopener noreferrer'
         >
            https://www.linkedin.com/in/maxim-saharov/
         </a>

         <br />
         I will give a test login and password.
         <br />
         <br />
         <a
            href='https://github.com/maxim-saharov/ReactKamasutra'
            target='_blank'
            rel='noopener noreferrer'
         >
            Also you can see this project at GitHub
         </a>

         <br />
         <br />
         maxim_saharov - userId - 23275
         <br />
         <a
            href='https://maxim-saharov.github.io/ReactKamasutra/#/profile/23275'
            target='_blank'
            rel='noopener noreferrer'
         >
            My profile in this project
         </a>

      </div>
   )
}