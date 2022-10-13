// Rsf - Creates a stateless React component
// as a named function without PropTypes

import React from 'react'
import s from './News.module.css'


const News = () => {

   return (

      <div className={s.newsBlock}>

         <div>
            Test access for this project: <br /> <br />
            Email: free@samuraijs.com
            <div className={s.someTab}></div>
            <button
               onClick={() => navigator.clipboard.writeText( 'free@samuraijs.com' )}
            >
               Copy
            </button>
            <br />
            Password: free
         </div>


         <div>
            <br />
            Test - userId - 1079 - test profile - it can be opened by
            <div className={s.someTab}></div>
            <a
               href='https://maxim-saharov.github.io/ReactKamasutra/#/profile/1079'
               target='_blank'
               rel='noopener noreferrer'
            >
               this link
            </a>
         </div>


         <div>
            <br />
            Maxim Saharov - userId - 23275 - my profile - it can be opened by
            <div className={s.someTab}></div>
            <a
               href='https://maxim-saharov.github.io/ReactKamasutra/#/profile/23275'
               target='_blank'
               rel='noopener noreferrer'
            >
               this link
            </a>
         </div>

         <div>
            <br />
            And see
            <div className={s.someTab}></div>
            <a
               href='https://github.com/maxim-saharov/ReactKamasutra'
               target='_blank'
               rel='noopener noreferrer'
            >
               my GitHub repo for the full code,
            </a>

            <br />
            I will be happy for the stars for it) <br />
            Thank you all and happy learning)
         </div>


         <div>
            <br />
            If some functional works incorrectly in test account, <br />
            or if you have some questions,<br />
            or you want full access, write me in
            <div className={s.someTab}></div>
            <a
               href='https://www.linkedin.com/in/maxim-saharov/'
               target='_blank'
               rel='noopener noreferrer'
            >
               Linkedin
            </a>
            <br />
            I will give you my own login and password.
         </div>

      </div>

   )
}

export default News




