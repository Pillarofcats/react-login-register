//Import
import React, {useContext} from 'react'
import { StoreContext } from './StoreContextProvider'
import getProfileImage from './functions/getProfileImage'


//Component
function Welcome() {

  const {user} = useContext(StoreContext)
  const profileImage = getProfileImage(user.user.image)

  //Render
  return (
    <>
      <div className="profile-image" style={profileImage}></div>
      <h1 className="home">Welcome {user.user.name.length > 15 ? user.user.name.slice(0,15)+".." : user.user.name}!</h1> 
    </>
  )
}

export default Welcome