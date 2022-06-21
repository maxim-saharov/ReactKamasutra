import React, {Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Navigate, HashRouter, Routes, Route, NavLink} from 'react-router-dom';

import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import {connect} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import UsersContainer from './components/Users/UsersContainer';
import News from './components/News/News';

const DialogsContainer = React.lazy( () => import('./components/Dialogs/DialogsContainer') );
const ProfileContainer = React.lazy( () => import('./components/Profile/ProfileContainer') );


class App extends React.Component {


   componentDidMount() {

      this.props.initializeApp();

      window.addEventListener( 'unhandledrejection',
         this.catchAllUnhandledErrors )

   }

   catchAllUnhandledErrors = (promiseRejectionEvent) => {
      //alert( 'Some error' );
      console.log( 'Some error' );
      console.log( promiseRejectionEvent )
   }

   componentWillUnmount() {
      window.removeEventListener( 'unhandledrejection',
         this.catchAllUnhandledErrors )
   }

   render() {

      if (!this.props.initialized) {

         return <Preloader />

      }


      return (
         // BrowserRouter HashRouter
         <HashRouter>

            <div className='app-wrapper'>
               <HeaderContainer />
               <Navbar />

               <div className='app-wrapper-content'>

                  <Suspense fallback={<Preloader />}>

                     <Routes>

                        <Route
                           path="/"
                           element={<Navigate to="/profile" />} />

                        <Route
                           path='/profile/:userId'
                           element={<ProfileContainer />} />

                        <Route
                           path='/profile'
                           element={<ProfileContainer />} />
                        <Route />

                        <Route
                           path='/dialogs/*'
                           element={<DialogsContainer />} />

                        <Route
                           path='/users'
                           element={<UsersContainer
                              pageTitle={'Самураи'} />} />

                        <Route
                           path='/login'
                           element={<LoginPage />} />

                        <Route
                           path='/news'
                           element={<News />} />

                        <Route
                           path='*'
                           element={<NotFound />} />

                     </Routes>

                  </Suspense>

               </div>

            </div>
         </HashRouter>
         // BrowserRouter HashRouter
      );
   }
}

let mapStateToProps = (state) => ({

   initialized: state.app.initialized

})


let NotFound = () => {
   return (
      <div className={'notFoundBlock'}>
         <div> ...Page 404</div>
         <div>< br /></div>
         <div>
            <NavLink to='/'>
               Go to main page
            </NavLink>
         </div>
      </div>
   )
}


export default connect( mapStateToProps, {initializeApp} )( App );


//BrowserRouter - раньше был - до публикации на гит хаб
//path='/dialogs/*'
//- так было когда по какому хочеш пути вроде можно идти
//типо так
//http://localhost:3000/dialogs/55
