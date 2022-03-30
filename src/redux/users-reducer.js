//

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';


let initialState = {

   users: [],

}

const usersReducer = (state = initialState, action) => {

   switch (action.type) {

      case FOLLOW:
         return {
            ...state,
            users: state.users.map( u => {
               if (u.id === action.userId) {
                  return {...u, followed: true}
               }
               return u;
            } ),
         };


      case UNFOLLOW:
         return {
            ...state,
            users: state.users.map( u => {
               if (u.id === action.userId) {
                  return {...u, followed: false}
               }
               return u;
            } ),
         };

      case SET_USERS:

         let stateCopy = {
            ...state,
            users: [...state.users, ...action.users]
            //users: [...action.users]
         }

         return stateCopy;


      default:
         return state;
   }
}

export const followAC = (userId) => ({type: FOLLOW, userId});

export const unFollowAC = (userId) => ({type: UNFOLLOW, userId});

export const setUsersAC = (users) => ({type: SET_USERS, users});

export default usersReducer;


//users: [...state.users], это тоже самое что и ниже
//users: state.users.map( u => u ),

// это означает что мы развернули и склеили два массива
//users: [...state.users, ...action.users]


//users: [
//    {
//       id: 1,
//       photoUrl: 'https://png.pngtree.com/png-vector/20200625/ourlarge/pngtree-male-avatar-white-collar-black-and-white-businessmen-silhouette-png-image_2266267.jpg',
//       followed: false,
//       fullName: 'Tom_',
//       status: 'free',
//       location: {city: 'Kiev1', country: 'Ukraine'}
//    },
//    {
//       id: 2,
//       photoUrl: 'https://png.pngtree.com/png-vector/20200625/ourlarge/pngtree-male-avatar-white-collar-black-and-white-businessmen-silhouette-png-image_2266267.jpg',
//       followed: true,
//       fullName: 'Andrey_',
//       status: 'free2',
//       location: {city: 'Kiev2', country: 'Ukraine2'}
//    },
//    {
//       id: 3,
//       photoUrl: 'https://png.pngtree.com/png-vector/20200625/ourlarge/pngtree-male-avatar-white-collar-black-and-white-businessmen-silhouette-png-image_2266267.jpg',
//       followed: false,
//       fullName: 'Ivan_',
//       status: 'free3',
//       location: {city: 'Kiev3', country: 'Ukraine3'}
//    }
//],
