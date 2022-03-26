import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";


const App = (props) => {

   return (

      <BrowserRouter>
         <div className='app-wrapper'>
            <Header />
            <Navbar />

            <div className='app-wrapper-content'>
               <Routes>
                  <Route
                     path='/profile/*'
                     element={
                        <Profile
                           store={props.store}
                        />} />
                  <Route
                     path='/dialogs/*'
                     element={
                        <DialogsContainer
                           store={props.store}
                        />}
                  />
               </Routes>
            </div>

         </div>
      </BrowserRouter>

   );
}

export default App;
