//
import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {NavLink} from "react-router-dom";
import axios from "axios";


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
                     {u.followed ?
                        <button
                           disabled={
                              props.followingInProgress.some( id => id === u.id )}
                           onClick={() => {

                              props.toggleFollowingProgress( true, u.id );

                              axios.delete( `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                 {
                                    withCredentials: true,
                                    headers: {'API-KEY': 'a991bdb8-903c-4ace-9a79-3ab2d68d863e'}
                                 } )
                                 .then( response => {

                                    if (response.data.resultCode === 0) {
                                       props.unfollow( u.id )
                                    }

                                    props.toggleFollowingProgress( false, u.id );

                                 } );

                           }}>
                           Unfollow
                        </button> :

                        <button
                           disabled={props.followingInProgress.some( id => id === u.id )}
                           onClick={() => {

                              props.toggleFollowingProgress( true, u.id );

                              axios.post( `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                                 {
                                    withCredentials: true,
                                    headers: {'API-KEY': 'a991bdb8-903c-4ace-9a79-3ab2d68d863e'}
                                 } )
                                 .then( response => {

                                    if (response.data.resultCode === 0) {
                                       props.follow( u.id )
                                    }

                                    props.toggleFollowingProgress( false, u.id );

                                 } );

                           }}>
                           Follow
                        </button>}
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


