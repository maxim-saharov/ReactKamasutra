import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";


const App = () => {

   return (

      <BrowserRouter>
         <div className='app-wrapper'>
            <Header />
            <Navbar />

            <div className='app-wrapper-content'>
               <Routes>
                  <Route
                     path='/profile/:userId'
                     element={
                        <ProfileContainer />} />
                  <Route
                     path='/dialogs/*'
                     element={
                        <DialogsContainer />}
                  />
                  <Route
                     path='/users'
                     element={
                        <UsersContainer />}
                  />
               </Routes>
            </div>

         </div>
      </BrowserRouter>

   );
}

export default App;
