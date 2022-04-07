//

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {

   users: [],
   pageSize: 5,
   totalUsersCount: 16,
   currentPage: 2,
   isFetching: false,
   followingInProgress: []

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
            } )
         }


      case UNFOLLOW:
         return {
            ...state,
            users: state.users.map( u => {
               if (u.id === action.userId) {
                  return {...u, followed: false}
               }
               return u;
            } )
         }


      case SET_USERS:
         return {
            ...state,
            users: action.users
         }


      case SET_CURRENT_PAGE:
         return {
            ...state,
            currentPage: action.currentPage

         }

      case SET_TOTAL_USERS_COUNT:
         //alert(action.TotalUsersCount)
         return {
            ...state,
            //totalUsersCount: action.TotalUsersCount
            // если так вывести то создаст 4 тыс страниц!

         }

      case TOGGLE_IS_FETCHING:
         return {
            ...state,
            isFetching: action.isFetching
         }

      case TOGGLE_IS_FOLLOWING_PROGRESS:
         return {
            ...state,
            followingInProgress:
               action.isFetching
                  ? [...state.followingInProgress, action.userId]
                  : state.followingInProgress.filter( id => id !== action.userId ),

         }


      default:
         return state;
   }
}

export const follow = (userId) => ({type: FOLLOW, userId});

export const unfollow = (userId) => ({type: UNFOLLOW, userId});

export const setUsers = (users) => ({type: SET_USERS, users});

export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});

export const setTotalUsersCount = (TotalUsersCount) => ({
   type: SET_TOTAL_USERS_COUNT,
   TotalUsersCount: TotalUsersCount
});
// выше для понимая длинная запись в переменой - TotalUsersCount - число 18215
// просто currentPage - это тоже самое что и currentPage: currentPage
//(тоесть мы передаем переменную с числом 5 например и получаем
// название ключа такое как была просто переменная-параметр и значение
// как было у переменной-параметра
// и потом что знась передали вторым параметром придет через акшен как
// action.currentPage

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});

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
