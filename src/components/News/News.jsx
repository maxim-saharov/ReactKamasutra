// Rsf - Creates a stateless React component
// as a named function without PropTypes

import React from 'react'
import s from './News.module.css'


const News = () => {

   return (

      <div className={s.newsBlock}>

         <div className='redColor'>
            С Украины смотреть только через VPN. Иначе ничего не загрузится и залогиниться тоже не получится!
         </div>

         <div>
            Тестовые доступы для этого проекта: <br />
            Email: free@samuraijs.com
            <div className={s.someTab}> </div>
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
            Test - userId - 1079 - тестовый профиль - его можно открыть по
            <div className={s.someTab}> </div>
            <a
               href='https://maxim-saharov.github.io/ReactKamasutra/#/profile/1079'
               target='_blank'
               rel='noopener noreferrer'
            >
               этой ссылке
            </a>
         </div>


         <div>
            <br />
            Maxim Saharov - userId - 23275 - мой профиль - его можно открыть по
            <div className={s.someTab}> </div>
            <a
               href='https://maxim-saharov.github.io/ReactKamasutra/#/profile/23275'
               target='_blank'
               rel='noopener noreferrer'
            >
               этой ссылке
            </a>
         </div>

         <div>
            <br />
            И смотрите
            <div className={s.someTab}> </div>
            <a
               href='https://github.com/maxim-saharov/ReactKamasutra'
               target='_blank'
               rel='noopener noreferrer'
            >
               в моем репозитории GitHub полный код,
            </a>

            <br />
            буду рад за поставленные звездочки в нем) <br />
            всем спасибо и приятного обучения)
         </div>


         <div>
            <br />
            Если под тестовым аккаунтом некоторый функционал работает некорректно или <br />
            если остались какие то вопросы или Вы хотите получить полный доступ,<br />
            напишите мне в
            <div className={s.someTab}> </div>
            <a
               href='https://www.linkedin.com/in/maxim-saharov/'
               target='_blank'
               rel='noopener noreferrer'
            >
               Linkedin
            </a>
            <br />
            Я дам свой личный логин и пароль.
         </div>

      </div>

   )
}

export default News




