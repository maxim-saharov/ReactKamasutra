//
import React, {Suspense} from 'react'
import './App.css'
import {Link, Route, Routes} from 'react-router-dom'
import {connect} from 'react-redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import {UserPage} from './components/Users/UsersContainer'
import News from './components/News/News'
import {AppStateGlobalType} from './redux/redux-store'
import {LoginPage} from './components/Login/Login'
import {NotFound} from './components/common/NotFound/NotFound'
import {Home} from './components/Home/Home'
import {Breadcrumb, Layout, Menu} from 'antd'
import {HeaderComponent} from './components/Header/HeaderComponent'
import type {MenuProps} from 'antd/es/menu'
import {LaptopOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons'


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))


type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = { initializeApp: () => void }


//region antd
const {Content, Footer, Sider} = Layout

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(label: React.ReactNode,
                        key?: React.Key | null,
                        icon?: React.ReactNode,
                        children?: MenuItem[]): MenuItem {
   return {
      key,
      icon,
      children,
      label
   } as MenuItem
}


const itemsSideMenu: MenuItem[] = [

   getItem('My Profile', 'MyProfile', <UserOutlined />, [
      getItem(
         <Link to='/profile'>
            Profile
         </Link>,
         'Profile'),
      getItem(
         <Link to='/dialogs'>
            Messages
         </Link>,
         'Messages')
   ]),

   getItem('Developers', 'Developers', <LaptopOutlined />, [
      getItem(
         <Link to='/developers'>
            Developers list
         </Link>,
         'DevelopersList'),
      getItem(
         <Link to='/chat'>
            Developers chat
         </Link>,
         'DevelopersChat')
   ]),

   getItem('Settings', 'Settings', <SettingOutlined />, [
      getItem(
         <Link to='/news'>
            News
         </Link>,
         'News'),
      getItem(
         <Link to='/22404'>
            Music
         </Link>,
         'Music')
   ])
]

//endregion antd

class App extends React.Component<MapPropsType & DispatchPropsType> {

   //region componentDid...
   catchAllUnhandledErrors = (
      promiseRejectionEvent: PromiseRejectionEvent) => {
      console.log('Some error')
      console.log(promiseRejectionEvent)
   }

   componentDidMount() {
      this.props.initializeApp()
      window.addEventListener('unhandledrejection',
         this.catchAllUnhandledErrors)
   }

   componentWillUnmount() {
      window.removeEventListener('unhandledrejection',
         this.catchAllUnhandledErrors)
   }

   //endregion

   render() {
      if (!this.props.initialized) {
         return (
            <div className='containerMy'>
               <Preloader />
               <Home />
            </div>)

         // return
      }

      return (
         <Layout>
            <HeaderComponent />
            <Content style={{padding: '0 50px'}}>
               <Breadcrumb style={{margin: '16px 0'}}>
                  <Breadcrumb.Item>
                     <Link to='/'>
                        Home
                     </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                     <Link to='/developers'>
                        List
                     </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
               </Breadcrumb>
               <Layout className='site-layout-background' style={{padding: '24px 0'}}>
                  <Sider className='site-layout-background' width={200}>
                     <Menu mode='inline' style={{height: '100%'}} items={itemsSideMenu} />
                  </Sider>
                  <Content style={{padding: '0 24px', minHeight: 280}}>
                     <Suspense fallback={<Preloader />}>
                        <Routes>
                           <Route
                              path='/'
                              // element={<Navigate to="/profile" />}
                              element={<Home />}
                           />
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
                              path='/developers'
                              element={<UserPage
                                 pageTitle={'Самураи'} />} />
                           <Route
                              path='/login'
                              element={<LoginPage />} />
                           <Route
                              path='/news'
                              element={<News />} />
                           <Route
                              path='/chat'
                              element={<ChatPage />} />
                           <Route
                              path='*'
                              element={<NotFound />} />
                        </Routes>
                     </Suspense>
                  </Content>
               </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>
               Samurai Social Network ©2022 Created by IT-KAMASUTRA/Maxim Saharov
            </Footer>
         </Layout>
      )
   }
}

let mapStateToProps = (state: AppStateGlobalType) => ({
   initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)


//BrowserRouter - раньше был - до публикации на гит хаб
//path='/dialogs/*'
//- так было когда по какому хочеш пути вроде можно идти
//типо так
//http://localhost:3000/dialogs/55
//
// {/*<div className='app-wrapper'>*/}
// {/*   <HeaderContainer />*/}
// {/*   <Navbar />*/}
//
// {/*   <div className='app-wrapper-content'>*/}
//
// {/*      <Suspense fallback={<Preloader />}>*/}
//
// {/*         <Routes>*/}
//
// {/*            <Route*/}
// {/*               path="/"*/}
// {/*               element={<Navigate to="/profile" />} />*/}
//
// {/*            <Route*/}
// {/*               path='/profile/:userId'*/}
// {/*               element={<ProfileContainer />} />*/}
//
// {/*            <Route*/}
// {/*               path='/profile'*/}
// {/*               element={<ProfileContainer />} />*/}
// {/*            <Route />*/}
//
// {/*            <Route*/}
// {/*               path='/dialogs/*'*/}
// {/*               element={<DialogsContainer />} />*/}
//
// {/*            <Route*/}
// {/*               path='/users'*/}
// {/*               element={<UserPage*/}
// {/*                  pageTitle={'Самураи'} />} />*/}
//
// {/*            <Route*/}
// {/*               path='/login'*/}
// {/*               element={<LoginPage />} />*/}
//
// {/*            <Route*/}
// {/*               path='/news'*/}
// {/*               element={<News />} />*/}
//
// {/*            <Route*/}
// {/*               path='*'*/}
// {/*               element={<NotFound />} />*/}
//
// {/*         </Routes>*/}
//
// {/*      </Suspense>*/}
//
// {/*   </div>*/}
//
// {/*</div>*/}
// {/*</HashRouter>*/}
// {/*// BrowserRouter HashRouter*/}
