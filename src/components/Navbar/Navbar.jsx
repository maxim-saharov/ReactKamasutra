import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
   return (

      <nav className={s.nav}>
         <div>
            <NavLink to='/profile'
                     className={navData => navData.isActive ? s.activeLink : s.item}>
               Profile
            </NavLink>
         </div>

         <div>
            <NavLink to='/dialogs'
                     className={navData => navData.isActive ? s.activeLink : s.item}>
               Messages
            </NavLink>
         </div>

         <div>
            <NavLink to='/users'
                     className={navData => navData.isActive ? s.activeLink : s.item}>
               Users
            </NavLink>
         </div>

         <div>
            <NavLink to="/11"
                     className={navData => navData.isActive ? s.activeLink : s.item}>
               News
            </NavLink>
         </div>
         <div>
            <NavLink to="/22"
                     className={navData => navData.isActive ? s.activeLink : s.item}>
               Music
            </NavLink>
         </div>
         <div>
            <NavLink to="/33"
                     className={navData => navData.isActive ? s.activeLink : s.item}>
               Settings
            </NavLink>
         </div>
      </nav>
   );

}

export default Navbar;