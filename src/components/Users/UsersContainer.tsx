//
import React from 'react'
import {connect} from 'react-redux'
import {
   follow, unfollow, requestUsers, FilterUsersReducerType
} from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {compose} from 'redux'
import {
   getCurrentPage, getFollowingInProgress, getIsFetching,
   getPageSize, getTotalUsersCount, getUsersFilter, getUsersSuperSelector
} from '../../redux/users-selectors'
import {UserType} from '../../types/types'
import {AppStateGlobalType} from '../../redux/redux-store'


type MapStatePropsType = {
   currentPage: number,
   pageSize: number,
   isFetching: boolean,
   totalUsersCount: number
   users: Array<UserType>,
   followingInProgress: Array<number>,
   filter: FilterUsersReducerType
}

type MapDispatchPropsType = {
   unfollow: (userId: number) => void,
   follow: (userId: number) => void,
   getUsers: (
      currentPage: number, pageSize: number,
      filter: FilterUsersReducerType) => void,
}

type OwnPropsType = {
   pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;


class UsersContainer extends React.Component<PropsType> {

   componentDidMount() {
      const {currentPage, pageSize, filter} = this.props
      this.props.getUsers(currentPage, pageSize, filter)
   }


   onPageChanged = (pageNumber: number) => {
      const {pageSize, filter} = this.props
      this.props.getUsers(pageNumber, pageSize, filter)
   }

   onFilterChanged = (filter: FilterUsersReducerType) => {

      const {pageSize} = this.props
      this.props.getUsers(1, pageSize, filter)


   }


   render() {

      return (
         <>
            <h2> {this.props.pageTitle}</h2>

            {this.props.isFetching ? <Preloader /> : null}

            <Users
               totalUsersCount={this.props.totalUsersCount}
               pageSize={this.props.pageSize}

               currentPage={this.props.currentPage}
               onPageChanged={this.onPageChanged}
               onFilterChanged={this.onFilterChanged}
               users={this.props.users}

               unfollow={this.props.unfollow}
               follow={this.props.follow}

               followingInProgress={this.props.followingInProgress}
            />
         </>
      )
   }
}


let mapStateToProps = (state: AppStateGlobalType): MapStatePropsType => {

   return {
      users: getUsersSuperSelector(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
      filter: getUsersFilter(state)
   }
}


const UsersContainerCompose = compose(
   connect<MapStatePropsType, MapDispatchPropsType,
      OwnPropsType, AppStateGlobalType>(mapStateToProps, {
      follow, unfollow, getUsers: requestUsers
   })
)(UsersContainer)

export default UsersContainerCompose


// оставили для понимания как было
// let mapStateToProps = (state) => {
//    return {
//       users: state.usersPage.users,
//       pageSize: state.usersPage.pageSize,
//       totalUsersCount: state.usersPage.totalUsersCount,
//       currentPage: state.usersPage.currentPage,
//       isFetching: state.usersPage.isFetching,
//       followingInProgress: state.usersPage.followingInProgress,
//    }
//
//isAuth: geIsAuth(state)
//isAuth={this.props.isAuth}
//
// withAuthRedirect - по идее так она должна была называться
//WithAuthRedirect, - это переадресация на страницу логина - сейчас ее отключили
// так было без compose
// export default WithAuthRedirect(
//    connect( mapStateToProps, {
//       follow, unfollow, setUsers, setCurrentPage, toggleIsFetching,
//       getUsers: getUsersThunkCreator
//    } )( UsersContainer )
// );
//
// getUsers: getUsersThunkCreator
// такую длинную запись специально оставили что бы понимать как оно работает
// тоесть когда обращаемся к getUsers - мы запускаем getUsersThunkCreator
// и туда передаем все параметры и там запускаються фвп и вф возвращается и коннект передает в параметре dispatch и запускает вф.
//
// так было раньше
// let mapDispatchToProps = (dispatch) => {
//
//    return {
//
//       follow: (userId) => {
//          dispatch( followAC( userId ) );
//       },
//
//       unfollow: (userId) => {
//          dispatch( unFollowAC( userId ) );
//       },
//
//       setUsers: (users) => {
//          dispatch( setUsersAC( users ) );
//       },
//
//       setCurrentPage: (pageNumber) => {
//          dispatch( setCurrentPageAC( pageNumber ) );
//       },
//
//       setTotalUsersCount: (totalCount) => {
//          dispatch( setUsersTotalCountAC( totalCount ) );
//       },
//
//       toggleIsFetching: (IsFetching) => {
//          dispatch( toggleIsFetchingAC( IsFetching ) );
//       },
//
//    }
// }
//
// так было до подключение санок
// this.props.toggleIsFetching( true );
//
// usersAPI.getUsers( this.props.currentPage, this.props.pageSize )
//    .then( data => {
//       this.props.toggleIsFetching( false );
//       this.props.setUsers( data.items );
//       this.props.setTotalUsersCount( data.totalCount );
//    } );



