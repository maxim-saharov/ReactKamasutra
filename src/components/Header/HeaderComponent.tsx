//
import React from 'react'
import {Link} from 'react-router-dom'
import s from './Header.module.css'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import {AppstoreOutlined} from '@ant-design/icons'
import {getItem, MenuItem} from '../../App'
import {useDispatch, useSelector} from 'react-redux'
import {selectCurrentUserLogin, selectIsAuth} from '../../redux/auth-selectors'
import {logout} from '../../redux/auth-reducer'


const {Header} = Layout

const itemsHeader: MenuItem[] = [
   getItem(
      <Link to='/developers'>
         Developers
      </Link>,
      'DevelopersHeader',
      // это типо ключ по которому потом в selectedKeys
      // указываем и будет по умолчанию подсвечиваться
      <AppstoreOutlined />, // это просто какая будет картинка из коллекции antd
   )
]


export const HeaderComponent: React.FC = () => {

   const isAuth = useSelector(selectIsAuth)
   const login = useSelector(selectCurrentUserLogin)
   const dispatch = useDispatch()

   const logoutCallback = () => {
      dispatch(logout())
   }

   return (
      <Header className='header'>
         <header>
            <Row>

               <Col span={3}>
                  <a
                     href={`#`}
                  >
                     <img className={s.headerPhoto}
                          src={'https://www.logodesign.net/images/illustration-logo.png'}
                          alt={'header-illustration-logo'}
                     />
                  </a>

               </Col>

               <Col span={4}>
                  <Menu theme='dark' mode='horizontal' items={itemsHeader}
                        selectedKeys={['DevelopersHeader']}
                  />
               </Col>

               <Col span={17}>
                  {isAuth
                     ? <div>
                        <Avatar alt={login || ''} src='https://joeschmoe.io/api/v1/random' />
                        <span className={s.loginBlockIsAuth}>
                           {login} - <Button
                           onClick={logoutCallback}>
                           Log out</Button>
                        </span>
                     </div>
                     : <div>
                        <Button className={s.loginBlockNotAuth}>
                           <Link to={'/login'}>Login</Link>
                        </Button>
                     </div>
                  }
               </Col>

            </Row>
         </header>
      </Header>
   )
}


// header - это хтмл тег для сео

