import React, {useState, useRef} from 'react'

//Blank profile image
import blankProfile from '../images/blankProfile.png'

//Profile component
function Profile({logout, user, setUser}) {

  //State hooks
  const [isEditName, setEditName] = useState(false)
  const [isEditEmail, setEditEmail] = useState(false)
  const [isEditImage, setEditImage] = useState(false)
  const [isEditGender, setEditGender] = useState(false)
  const [isEditBirthday, setEditBirthday] = useState(false)

  //Ref hooks
  const nameRef = useRef("")
  const emailRef = useRef("")
  const imageRef = useRef("")
  const genderRef = useRef("")
  const birthdayRef = useRef("")

  //Profile image logic
  const profileImage = user.image ? user.image : blankProfile
  const profileImageStyle = {
    backgroundImage: `url('${profileImage}')`
  }

  //Component method
  function editSubmit() {
    //Submit profile data for update
    getEdits()
      .then((user) => {
        if(user) {
          setUser({id: user.id, name: user.name, email: user.email, image: user.image, gender: user.gender, birthday: user.birthday})
        }
      })
      .catch((err) => console.log(err))

    //Reset refs
    nameRef.current.value = ""
    emailRef.current.value = ""
    imageRef.current.value = ""
    genderRef.current.value = ""
    birthdayRef.current.value = ""

    //Reset edited fields after submit
    if(isEditName) setEditName(false)
    if(isEditEmail) setEditEmail(false)
    if(isEditImage) setEditImage(false)
    if(isEditGender) setEditGender(false)
    if(isEditBirthday) setEditBirthday(false)
  }

  //Component method
  async function getEdits() {

    console.log('name', nameRef.current.value)
    console.log('email', emailRef.current.value)
    console.log('image', imageRef.current.value)
    console.log('gender', genderRef.current.value)
    console.log('bday', birthdayRef.current.value)


    const urlPattern = new RegExp('^(http|https)://')
    const isValidImage = imageRef.current.value ? imageRef.current.value.match(urlPattern) : false
    if(!isValidImage && isEditImage) return console.log('not valid imag url')

    //No edits made RETURN
    if(!(isEditName || isEditEmail || isEditImage || isEditGender || isEditBirthday)) return
    //Edits with no changes made RETURN
    if((isEditName && (nameRef.current.value === undefined || nameRef.current.value === "")) ||
      (isEditEmail && (emailRef.current.value === undefined || emailRef.current.value === "")) ||
      (isEditImage && (imageRef.current.value === undefined || imageRef.current.value === "")) ||
      (isEditGender && (genderRef.current.value === undefined || genderRef.current.value === "" || genderRef.current.value === user.gender)) ||
      (isEditBirthday && (birthdayRef.current.value === undefined || birthdayRef.current.value === ""))) return

    console.log("edits passed..")

    //Edits object
    let edits = {}
    //Create object with edits specified by user
    if(isEditName && nameRef.current.value !== user.name) edits.name = nameRef.current.value
    if(isEditEmail && emailRef.current.value !== user.email) edits.email = emailRef.current.value
    if(isEditImage && imageRef.current.value !== user.image) edits.image = imageRef.current.value
    if(isEditGender && genderRef.current.value !== user.gender) edits.gender = genderRef.current.value
    if(isEditBirthday && birthdayRef.current.value !== user.birthday) edits.birthday = birthdayRef.current.value

    //User edited data
    let userAfterEdit = {
      id: user.id,
      edits: edits
    }

    // const URL = "http://localhost:3000/saveEdits"
    const URL = "https://classy-steel-production.up.railway.app/editProfile"

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify(userAfterEdit)
      })
      return await response.json()
    } catch(err) {
      return console.log(err)
    }
  }

  return(
    <div className="center-page">
    {
      user.id ? 
      ( <div className="profile ">
          <div className="profile-image" style={profileImageStyle}></div>
          <div className="profile-grid-container">
            <div className="profile-keys">
              <label>Name:</label>
              <label>Email:</label>
              <label>Image:</label>
              <label>Gender:</label>
              <label>Birthday:</label>
            </div>
            <div className="profile-values">
              {isEditName ? <input ref={nameRef} placeholder={user.name} type="text"/> : <p>{user.name}</p> }
              {isEditEmail ? <input ref={emailRef} placeholder={user.email} type="text" /> : <p>{user.email}</p>}
              {isEditImage ? <input ref={imageRef} placeholder={user.image} type="text" /> :
                user.image?.length > 15 ? <p>{user.image.slice(0,15)+'..'}</p> : <p>{user.image}</p>}
              {isEditGender ?
                <select ref={genderRef} placeholder={user.gender}>
                  <option value="">Empty</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Variant">Variant</option>
                </select>
                : <p>{user.gender}</p>}
              {isEditBirthday ? <input ref={birthdayRef} placeholder={user.birthday} type="date" /> : <p>{user.birthday}</p>} 
            </div>
            <div className="profile-edits">
              <button className="btn btn-primary" onClick={() => setEditName(prev => !prev)}>edit</button>
              <button className="btn btn-primary" onClick={() => setEditEmail(prev => !prev)}>edit</button>
              <button className="btn btn-primary" onClick={() => setEditImage(prev => !prev)}>edit</button>
              <button className="btn btn-primary" onClick={() => setEditGender(prev => !prev)}>edit</button>
              <button className="btn btn-primary" onClick={() => setEditBirthday(prev => !prev)}>edit</button>
            </div>
          </div>
          <div className="profile-logout-save-btns">
            <button className="btn btn-primary me-auto" onClick={logout()}>Logout</button>
            <button className="btn btn-primary ms-auto" onClick={() => editSubmit()}>Save Edits</button>
          </div>
        </div>
        ) : (
          <h1 className="center-page">You aren't logged in Stranger!</h1>
      )
    }
    </div>
  ) 
}

export default Profile