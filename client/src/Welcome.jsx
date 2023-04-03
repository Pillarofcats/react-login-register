//Import
import React, {useContext} from 'react'
import { StoreContext } from './StoreContextProvider'
import blankProfile from '../src/images/blankProfile.png'

//Component
function Welcome() {

  const {user} = useContext(StoreContext)

  const profileImage = user.user.image ? user.user.image : blankProfile
  const profileImageStyle = {
    backgroundImage: `url('${profileImage}')`
  }
  //Render
  return (
    <>
      <div className="profile-image" style={profileImageStyle}></div>
      <h1 className="home">Welcome {user.user.name.length > 15 ? user.user.name.slice(0,15)+".." : user.user.name}!</h1> 
    </>
  )
}

export default Welcome