import blankProfile from '../images/blankProfile.png'

function getProfileImage(user) {
  const profileImage = user.user.image ? user.user.image : blankProfile
  const profileImageStyle = {
    backgroundImage: `url('${profileImage}')`
  }
  
  return profileImageStyle
}

export default getProfileImage