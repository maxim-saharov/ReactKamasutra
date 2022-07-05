// Rsf - Creates a stateless React component
// as a named function without PropTypes

import React from 'react';
import s from './News.module.css';

const News = () => {

   return (

      <div className={s.newsBlock}>

         <div>
            maxim_saharov - userId - 23275
         </div>

         <div>
            <br/>
            Можно открыть в новой вкладке:
         </div>

         <div>

            <p>
               <a
                  href="https://maxim-saharov.github.io/ReactKamasutra/#/profile/23275"
                  target="_blank"
                  rel="noopener noreferrer"

               >
                  Ссылку на мой профиль на этом сайта
               </a>
            </p>


            <div>
               И смотрите в моем репозитории полный код,
            </div>
            <div>
               буду рад за поставленные звездочки в нем)
            </div>
            <div>
               всем спасибо и приятного обучения)
            </div>


            <p>
               <a
                  href="https://github.com/maxim-saharov/ReactKamasutra"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Cсылка на этот проект на GitHub
               </a>
            </p>

         </div>


      </div>


   );
};

export default News;




