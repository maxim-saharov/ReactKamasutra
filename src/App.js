import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";


class App extends React.Component {

   componentDidMount() {
      this.props.initializeApp();
   }

   render() {

      if (!this.props.initialized){

         return <Preloader/>

      }


      return (
         <BrowserRouter>

            <div className='app-wrapper'>
               <HeaderContainer />
               <Navbar />

               <div className='app-wrapper-content'>
                  <Routes>
                     <Route
                        path='/profile/:userId'
                        element={
                           <ProfileContainer />} />

                     <Route
                        path='/profile'
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
                     <Route
                        path='/login'
                        element={
                           <LoginPage />}
                     />
                  </Routes>
               </div>

            </div>
         </BrowserRouter>
      );
   }
}

let mapStateToProps = (state) => ({

   initialized: state.app.initialized

})


export default connect( mapStateToProps, {initializeApp} )( App );


//path='/dialogs/*'
//- так было когда по какому хочеш пути вроде можно идти
//типо так
//http://localhost:3000/dialogs/55
