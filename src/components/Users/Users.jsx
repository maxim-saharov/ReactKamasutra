//
import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = (props) => {

   let {
      currentPage, onPageChanged, totalUsersCount,
      pageSize, followingInProgress, unfollow, follow,
      users
   } = props;


   return (
      <div>

         <Paginator currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
         />

         <div>
            {users.map( user =>
               <User key={user.id}
                     user={user}
                     followingInProgress={followingInProgress}
                     unfollow={unfollow}
                     follow={follow}
               /> )
            }
         </div>

      </div>)
}

export default Users;




