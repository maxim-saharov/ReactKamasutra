//
import React, {useEffect} from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import {FilterUsersReducerType, follow, requestUsers, unfollow} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
   getCurrentPage,
   getFollowingInProgress,
   getPageSize,
   getTotalUsersCount,
   getUsersFilter,
   getUsersSuperSelector
} from '../../redux/users-selectors'


export const Users: React.FC = () => {

   const users = useSelector(getUsersSuperSelector)
   const totalUsersCount = useSelector(getTotalUsersCount)
   const currentPage = useSelector(getCurrentPage)
   const pageSize = useSelector(getPageSize)
   const filter = useSelector(getUsersFilter)
   const followingInProgress = useSelector(getFollowingInProgress)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(requestUsers(currentPage, pageSize, filter))
   }, [])


   const onPageChanged = (pageNumber: number) => {
      dispatch(requestUsers(pageNumber, pageSize, filter))
   }

   const onFilterChanged = (filter: FilterUsersReducerType) => {
      dispatch(requestUsers(1, pageSize, filter))
   }

   const followTransit = (userId: number) => {
      dispatch(follow(userId))
   }

   const unfollowTransit = (userId: number) => {
      dispatch(unfollow(userId))
   }


   return (
      <div>

         <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
         </div>

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
                     follow={followTransit}
                     unfollow={unfollowTransit}
               />)
            }
         </div>

      </div>)
}





