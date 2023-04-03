import blankProfile from '../src/images/blankProfile.png'

function getProfileImage(image) {
  const profileImage = image ? image : blankProfile
  const profileImageStyle = {
    backgroundImage: `url('${profileImage}')`
  }
  return profileImageStyle
}

export default getProfileImage