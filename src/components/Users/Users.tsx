//
import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";


type PropsType = {
   currentPage: number,
   totalUsersCount: number,
   pageSize: number,
   followingInProgress: Array<number>,
   unfollow: (userId: number) => void,
   follow: (userId: number) => void,
   users: Array<UserType>,

   onPageChanged: (pageNumber: number) => void
}

let Users: FC<PropsType> = (props) => {

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
            {users.map(user =>
               <User key={user.id}
                     user={user}
                     followingInProgress={followingInProgress}
                     unfollow={unfollow}
                     follow={follow}
               />)
            }
         </div>

      </div>)
}

export default Users;



