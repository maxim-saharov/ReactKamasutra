import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import state, {subscribe} from "./redux/state";
import App from './App';

import {addPost, updateNewPostText} from "./redux/state";

let rerenderEntireTree = (state) => {

   ReactDOM.render(
      <React.StrictMode>

         <App state={state}
              addPost={addPost}
              updateNewPostText={updateNewPostText} />

      </React.StrictMode>,
      document.getElementById( 'root' )
   );
}


rerenderEntireTree( state );

subscribe( rerenderEntireTree );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
