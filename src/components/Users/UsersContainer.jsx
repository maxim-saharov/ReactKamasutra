//
import React from "react";
import {connect} from "react-redux";
import {
   follow, unfollow, setUsers, setCurrentPage,
   toggleIsFetching, getUsersThunkCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";
import {WithAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";


class UsersContainer extends React.Component {

   componentDidMount() {

      this.props.getUsers( this.props.currentPage, this.props.pageSize );

   }

   onPageChanged = (pageNumber) => {

      // эту менять на санки не буду оставлю для понимание как было
      // и Дима здесь ошибся - зменил тупо на то что выше.
      this.props.setCurrentPage( pageNumber );

      this.props.toggleIsFetching( true );

      usersAPI.getUsers( pageNumber, this.props.pageSize )
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

               isAuth={this.props.isAuth}

            />
         </>
      )
   }
}


let mapStateToProps = (state) => {

   return {
      users: state.usersPage.users,
      pageSize: state.usersPage.pageSize,
      totalUsersCount: state.usersPage.totalUsersCount,
      currentPage: state.usersPage.currentPage,
      isFetching: state.usersPage.isFetching,
      followingInProgress: state.usersPage.followingInProgress,
      isAuth: state.auth.isAuth
   }
}

const UsersContainerCompose = compose(
   //WithAuthRedirect,
   connect( mapStateToProps, {
      follow, unfollow, setUsers, setCurrentPage, toggleIsFetching,
      getUsers: getUsersThunkCreator
   } )
)( UsersContainer )

export default UsersContainerCompose;

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



