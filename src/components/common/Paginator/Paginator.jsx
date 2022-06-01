//
import React from "react";
import styles from "./Paginator.module.css";


let Paginator = (props) => {

   let pageCount = Math.ceil( props.totalUsersCount / props.pageSize );

   let pages = [];

   for (let i = 1; i <= pageCount; i++) {
      pages.push( i );
   }


   return (

      <div>
         {pages.map( p => {

            return (
               <span
                  className={
                     props.currentPage === p
                        ? styles.selectedPage
                        : ''}
                  key={p}
                  onClick={() => {
                     props.onPageChanged( p );
                  }}>
                              {p}
               </span>)

         } )}
      </div>

   )
}

export default Paginator;



