//
import React from "react";
import {connect} from "react-redux";
import {
   follow, unfollow, setUsers, setCurrentPage,
   toggleIsFetching, requestUsersThunkCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";
import {compose} from "redux";
import {
   getCurrentPage, getFollowingInProgress, getIsFetching,
   getPageSize, getTotalUsersCount, getUsersSuperSelector
} from "../../redux/users-selectors";


class UsersContainer extends React.Component {

   componentDidMount() {
      const {currentPage, pageSize} = this.props;
      this.props.getUsersProps( currentPage, pageSize );
   }

   onPageChanged = (pageNumber) => {
      // эту менять на санки не буду оставлю для понимание как было
      // и Дима здесь ошибся - изменил тупо на то что выше.

      this.props.setCurrentPage( pageNumber );

      this.props.toggleIsFetching( true );

      const {pageSize} = this.props;

      usersAPI.getUsers( pageNumber, pageSize )
         .then( data => {
            this.props.toggleIsFetching( false );
            this.props.setUsers( data.items )
         } );
   }


   render() {

      return (
         <>
            {this.props.isFetching ? <Preloader /> : null}

            <Users
               totalUsersCount={this.props.totalUsersCount}
               pageSize={this.props.pageSize}

               onPageChanged={this.onPageChanged}
               currentPage={this.props.currentPage}
               users={this.props.users}

               unfollow={this.props.unfollow}
               follow={this.props.follow}

               followingInProgress={this.props.followingInProgress}
            />
         </>
      )
   }
}


let mapStateToProps = (state) => {

   return {
      users: getUsersSuperSelector( state ),
      pageSize: getPageSize( state ),
      totalUsersCount: getTotalUsersCount( state ),
      currentPage: getCurrentPage( state ),
      isFetching: getIsFetching( state ),
      followingInProgress: getFollowingInProgress( state ),
   }
}

const UsersContainerCompose = compose(
   //WithAuthRedirect,
   connect( mapStateToProps, {
      follow, unfollow, setUsers, setCurrentPage, toggleIsFetching,
      getUsersProps: requestUsersThunkCreator
   } )
)( UsersContainer )

export default UsersContainerCompose;


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

//isAuth: geIsAuth(state)
//isAuth={this.props.isAuth}

//WithAuthRedirect, - это переадресация на страницу логина - сейчас ее отключили
// так было без compose
// export default WithAuthRedirect(
//    connect( mapStateToProps, {
//       follow, unfollow, setUsers, setCurrentPage, toggleIsFetching,
//       getUsers: getUsersThunkCreator
//    } )( UsersContainer )
// );

// getUsers: getUsersThunkCreator
// такую длинную запись специально оставили что бы понимать как оно работает
// тоесть когда обращаемся к getUsers - мы запускаем getUsersThunkCreator
// и туда передаем все параметры и там запускаються фвп и вф возвращается и коннект передает в параметре dispatch и запускает вф.

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

// так было до подключение санок
// this.props.toggleIsFetching( true );
//
// usersAPI.getUsers( this.props.currentPage, this.props.pageSize )
//    .then( data => {
//       this.props.toggleIsFetching( false );
//       this.props.setUsers( data.items );
//       this.props.setTotalUsersCount( data.totalCount );
//    } );



