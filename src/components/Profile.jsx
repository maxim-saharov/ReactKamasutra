
const Profile = () => {
   return (
      <div className='content'>
         <div>
            <img src='https://html5css.ru/css/img_forest.jpg' />
         </div>

         <div className="My-Posts"> 
         {/* эту обвертку я сам сделал  */}
            <div>
               Avatar + description
            </div>

            <div> My posts:
               <div>
                  ..New posts
               </div>
               <div>
                  <div>
                     ....Post 1002
                  </div>
                  <div>
                     ....Post 2001
                  </div>
               </div>
            </div> 
         </div>

      </div>
   );
}

export default Profile;