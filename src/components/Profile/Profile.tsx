//
import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import {ProfileType} from '../../types/types'


type PropsType = {
   profile: ProfileType
   status: string
   updateStatus: (status: string) => void
   isOwner: boolean
   savePhoto: (photoFile: File) => void
   saveProfile: (formData: ProfileType, setStatus: any,
                 setSubmitting: any, goToViewMode: any) => void
}

const Profile: React.FC<PropsType> = (props) => {

   return (
      <div>
         <ProfileInfo
            {...props}
         />
         <MyPostsContainer
         />
      </div>
   )
}

export default Profile

