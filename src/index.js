import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import store from "./redux/redux-store";
import App from './App';
import {Provider} from "react-redux";

   ReactDOM.render(
      //<React.StrictMode>

         <Provider store={store}>

            <App/>

         </Provider>,

      //</React.StrictMode>,
      document.getElementById( 'root' )
   );

reportWebVitals();

// и обвертку rerenderEntireTree() -  тоже убираем

// так было когда без библиотеки реак-редакс было и каждый раз все
// дерево получается перерисовывалось при изменении стейта
// store.subscribe( () => {
//    rerenderEntireTree()
// } );

// раньше когда самодельный стор вызывали тут было так
//store.subscribe(rerenderEntireTree);

// раньше когда самодельный стор вызывали тут было так
// и это прокидывали в апп:
//state={state}
//dispatch={store.dispatch.bind( store )}

// rerenderEntireTree( store.getState() );
// и стейт уже ен передаем - каждая конечная тупая компонента
// внутри возьмем стейт - наверно осинхронно и отрисуется

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


