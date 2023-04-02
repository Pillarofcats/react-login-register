//Blank profile image
import blankProfile from '../images/blankProfile.png'

import DiaryForm from '../DiaryForm'
import UserDiary from '../userDiary'

//Page component route
function Home({user, userDiary}) {

  //Profile image logic
  const profileImage = user.image ? user.image : blankProfile
  const profileImageStyle = {
    backgroundImage: `url('${profileImage}')`
  }

  //Render
  return (
    <>
    {
      user.id ? (
        <div className="center-page">
          <div className="profile-image" style={profileImageStyle}></div>
          <h1 className="home">Welcome {user.name.length > 15 ? user.name.slice(0,15)+".." : user.name}!</h1> 
          <h2>Diary</h2>
          <DiaryForm />
          <UserDiary userDiary={userDiary}/>
        </div>  
      ) : (
      <h1 className="center-page">Welcome Stranger!</h1>
      )
    }
    </>
  )
}

export default Home