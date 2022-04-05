//
import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {NavLink} from "react-router-dom";


let Users = (props) => {

   let pageCount = Math.ceil( props.totalUsersCount / props.pageSize );

   let pages = [];

   for (let i = 1; i <= pageCount; i++) {
      pages.push( i );
   }


   return (
      <div>
         <div>
            {pages.map( p => {

               return (
                  <span
                     className={props.currentPage === p ?
                        styles.selectedPage : ''}
                     key={p}
                     onClick={() => {
                        props.onPageChanged( p );
                     }}>
                              {p}
                        </span>)

            } )}
         </div>

         {
            props.users.map( u => <div key={u.id}>

               <span>
                  <div>
                     <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto}
                             className={styles.userPhoto}
                             alt={'fff'} />
                     </NavLink>
                  </div>

                  <div>
                     {u.followed
                        ? <button onClick={() => {
                           props.unfollow( u.id )
                        }}>
                           Unfollow </button>

                        : <button onClick={() => {
                           props.follow( u.id )
                        }}>
                           Follow </button>}
                  </div>
               </span>

               <span>
                  <span>
                     <div>
                        {u.name}
                     </div>
                     <div>
                        {u.status}
                     </div>
                  </span>

                  <span>
                     <div>
                        {'u.location.country'}
                     </div>
                     <div>
                        {'u.location.city'}
                     </div>
                  </span>
               </span>

            </div> )

         }
      </div>
   )
}

export default Users;


