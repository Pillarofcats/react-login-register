function Profile({user}) {

  return(
    <>
    {
      user.name ? 
      (<h1 className="center-page">This is your profile {user.name}</h1>
      //  <img src={user.img} alt="" />
        ) : (
          <h1 className="center-page">You aren't logged in Stranger</h1>
      )
    }
    </>
  ) 
}

export default Profile