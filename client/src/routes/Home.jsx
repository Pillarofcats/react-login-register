//Blank profile image
import blankProfile from '../images/blankProfile.png'

function Home({user}) {

  //Profile image logic
  const profileImage = user.image ? user.image : blankProfile
  const profileImageStyle = {
    backgroundImage: `url('${profileImage}')`
  }

  return(
    <>
    {
      user.id ? (
        <div className="center-page">
          <div className="profile-image" style={profileImageStyle}></div>
          <h1 className="home">Welcome {user.name.length > 15 ? user.name.slice(0,15)+".." : user.name}!</h1> 
          <p>Feed</p>
          <p>Targeted Articles</p>
          {/* <div className='home-textarea' dangerouslySetInnerHTML={{__html: "<textarea placeholder='Notes..' rows='5' cols='40' />"}} /> */}
        </div>  
      ) : (
      <h1 className="center-page">Welcome Stranger!</h1>
      )
    }
    </>
  )
}

export default Home