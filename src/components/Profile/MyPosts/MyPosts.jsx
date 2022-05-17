//
import React from "react";
import s from './MyPosts.module.css';
import Post from './Posts/Post';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {ErrorMessageWrapper} from "../../../utils/validators/validators";


const MyPosts = (props) => {

   let postsElement =
      props.posts.map( p => <Post value={p.message} likesCount={p.likesCount} key={p.id} /> );

   return (
      <div className={s.postsBlock}>

         <h3 className={s.text_h3}>
            My posts:
         </h3>

         <AddNewPostForm
            addPost={props.addPost}
         />

         <div className={s.posts}>
            {postsElement}
         </div>


      </div>
   );
}


const AddNewPostForm = (props) => {

   const validationSchema = Yup.object().shape( {

      newPostText: Yup.string()
         .min( 2, "Must be longer than 2 characters !" )
         .max( 5, "Must be shorter than 5 characters !" )
         .required( "Required !" )
   } );

   const OnAddPost = (values) => {
      props.addPost( values );
   }

   return (
      <Formik
         initialValues={{
            newPostText: ""
         }}
         validationSchema={validationSchema}
         onSubmit={(values, {resetForm}) => {
            OnAddPost( values.newPostText );
            resetForm( {values: ''} );
         }}
      >
         {() => (
            <Form>
               <div>
                  <Field
                     name={'newPostText'}
                     as={'textarea'}
                     placeholder={'enter text 1'}
                  />
               </div>

               <ErrorMessage name="newPostText">
                  {ErrorMessageWrapper}
               </ErrorMessage>

               <button type={'submit'}>Add posts</button>
            </Form>
         )}
      </Formik>
   )
}


export default MyPosts;


// так было раньше без формика
//let newPostElement = React.createRef()

// let OnAddPost = () => {
//    props.addPost();
// }
//
//
// let onPostChange = () => {
//    let text = newPostElement.current.value;
//    props.updateNewPostText( text );
// }

// <div>
//    <textarea ref={newPostElement}
//              onChange={onPostChange}
//              value={props.newPostText} />
// </div>
//
// <div>
//    <button onClick={OnAddPost}> Add posts
//    </button>
// </div>