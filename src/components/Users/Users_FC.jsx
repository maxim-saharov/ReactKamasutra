// //  так было раньше на фк - оставил просто для инфо как было
// уже переделали на кк
//
// import React from "react";
// import styles from './users.module.css';
// import * as axios from "axios";
// import userPhoto from '../../assets/images/user.jpg';
//
// let Users = (props) => {
//
//    let GetUsers = () => {
//
//       if (props.users.length === 0) {
//
//          axios.get( 'https://social-network.samuraijs.com/api/1.0/users' )
//             .then( response => {
//
//                let usersB = response.data.items;
//
//                props.setUsers( usersB );
//
//             } );
//
//          // let usersA = [
//          //    {
//          //       id: 1,
//          //       photoUrl: 'https://png.pngtree.com/png-vector/20200625/ourlarge/pngtree-male-avatar-white-collar-black-and-white-businessmen-silhouette-png-image_2266267.jpg',
//          //       followed: false,
//          //       fullName: 'Tom_',
//          //       status: 'free',
//          //       location: {city: 'Kiev1', country: 'Ukraine'}
//          //    },
//          //    {
//          //       id: 2,
//          //       photoUrl: 'https://png.pngtree.com/png-vector/20200625/ourlarge/pngtree-male-avatar-white-collar-black-and-white-businessmen-silhouette-png-image_2266267.jpg',
//          //       followed: true,
//          //       fullName: 'Andrey_',
//          //       status: 'free2',
//          //       location: {city: 'Kiev2', country: 'Ukraine2'}
//          //    },
//          //    {
//          //       id: 3,
//          //       photoUrl: 'https://png.pngtree.com/png-vector/20200625/ourlarge/pngtree-male-avatar-white-collar-black-and-white-businessmen-silhouette-png-image_2266267.jpg',
//          //       followed: false,
//          //       fullName: 'Ivan_',
//          //       status: 'free3',
//          //       location: {city: 'Kiev3', country: 'Ukraine3'}
//          //    },
//          // ]
//          //
//          //props.setUsers( usersA );
//
//       }
//    }
//
//
//    return (
//       <div>
//          <button onClick={GetUsers}>Get Users</button>
//          {
//             props.users.map( u => <div key={u.id}>
//
//                <span>
//                   <div>
//                      <img src={u.photos.small !== null ? u.photos.small : userPhoto}
//                           className={styles.userPhoto}
//                           alt={'fff'} />
//                   </div>
//                   <div>
//                      {u.followed
//
//                         ? <button onClick={() => {
//                            props.unfollow( u.id )
//                         }}>
//                            Unfollow </button>
//
//                         : <button onClick={() => {
//                            props.follow( u.id )
//                         }}>
//                            Follow </button>}
//
//                   </div>
//                </span>
//
//                <span>
//
//                   <span>
//                      <div>
//                         {u.name}
//                      </div>
//                      <div>
//                         {u.status}
//                      </div>
//                   </span>
//
//                   <span>
//                      <div>
//                         {'u.location.country'}
//                      </div>
//                      <div>
//                         {'u.location.city'}
//                      </div>
//                   </span>
//
//                </span>
//
//             </div> )
//
//          }
//       </div>
//    )
// }
//
// export default Users;
