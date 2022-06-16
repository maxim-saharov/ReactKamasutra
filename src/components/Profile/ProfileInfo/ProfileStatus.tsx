//
import React, {ChangeEvent} from "react";

type PropsType = {
   status: string,
   updateStatus: (newStatus: string) => void
};

type StateType = {
   editMode: boolean,
   status: string
}


class ProfileStatus extends React.Component<PropsType, StateType> {

   state = {
      editMode: false,
      status: this.props.status
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

      this.props.updateStatus(this.state.status);
   }


   onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {

      this.setState(
         {status: e.currentTarget.value}
      )
   }


   componentDidUpdate(prevProps: PropsType,
                      prevState: StateType) {

      if (prevProps.status !== this.props.status) {

         this.setState(
            {status: this.props.status}
         )
      }

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
                  onChange={this.onStatusChange}
                  value={this.state.status} />
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