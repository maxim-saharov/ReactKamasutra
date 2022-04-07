//
import React from "react";
import {connect} from "react-redux";
import {
   follow, unfollow, setUsers, setCurrentPage,
   setTotalUsersCount, toggleIsFetching, toggleFollowingProgress
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../api/api";


class UsersContainer extends React.Component {
   totalCount; // это что бы не ругалось

   componentDidMount() {

      this.props.toggleIsFetching( true );

      usersAPI.getUsers( this.props.currentPage, this.props.pageSize )
         .then( data => {
            this.props.toggleIsFetching( false );
            this.props.setUsers( data.items );
            this.props.setTotalUsersCount( data.totalCount );
         } );
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
   }


   onPageChanged = (pageNumber) => {

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
               toggleFollowingProgress={this.props.toggleFollowingProgress}

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
      followingInProgress: state.usersPage.followingInProgress

   }
}


export default connect( mapStateToProps, {

   follow, unfollow, setUsers, setCurrentPage,
   setTotalUsersCount, toggleIsFetching, toggleFollowingProgress

} )( UsersContainer );


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



