//
import React from "react";


class ProfileStatus extends React.Component {

   state = {
      editMode: false,
      title: 555-4
   }

   activateEditMode = () => {
      this.setState(
         {editMode: true}
      )
   }

   deActivateEditMode = () => {
      this.setState(
         {editMode: false}
      )
   }


   render() {

      return (
         <div>

            {!this.state.editMode &&
            <div>
               <span
                  onDoubleClick={this.activateEditMode}>
                  {this.props.status}
               </span>
            </div>
            }

            {this.state.editMode &&
            <div>
               <input
                  autoFocus={true}
                  onBlur={this.deActivateEditMode}
                  value={this.props.status} />
            </div>
            }

         </div>
      );
   }
}

export default ProfileStatus;

//
// это тоже самое что и выше - когда просто объект сделали
// с таким же именем
// constructor(props) {
//    super( props );
//
//    this.state = {
//       editMode: false
//    }
// }