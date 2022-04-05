//
import React from "react";
import {connect} from "react-redux";
import {
   follow, unfollow, setUsers, setCurrentPage,
   setTotalUsersCount, toggleIsFetching
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";


class UsersContainer extends React.Component {
   totalCount; // это что бы не ругалось

   componentDidMount() {

      this.props.toggleIsFetching( true );

      axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}` )
         .then( response => {
               this.props.toggleIsFetching( false );
               let usersB = response.data.items;
               this.props.setUsers( usersB );
               this.props.setTotalUsersCount( response.data.totalCount );
            }
         )
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
   }


   onPageChanged = (pageNumber) => {

      this.props.setCurrentPage( pageNumber );

      this.props.toggleIsFetching( true );

      axios.get( `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}` )
         .then( response => {
               this.props.toggleIsFetching( false );
               let usersB = response.data.items;
               this.props.setUsers( usersB )
            }
         )
   }


   render() {
      return (
         <>

            {this.props.isFetching ? <Preloader /> : null}

            <Users

               totalUsersCount={this.props.totalUsersCount}
               pageSize={this.props.pageSize}
               currentPage={this.props.currentPage}
               users={this.props.users}
               unfollow={this.props.unfollow}
               follow={this.props.follow}
               isFetching={this.props.isFetching}

               onPageChanged={this.onPageChanged}
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
      isFetching: state.usersPage.isFetching
   }
}


export default connect( mapStateToProps, {

   follow, unfollow, setUsers, setCurrentPage,
   setTotalUsersCount, toggleIsFetching

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



