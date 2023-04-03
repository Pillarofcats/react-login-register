//React hooks
import React, {useState, useRef, useContext} from 'react'
import { StoreContext } from '../StoreContextProvider'

//Component
import ServerMessage from '../ServerMessage'

//functions
import logout from '../functions/logout'
import getProfileImage from '../functions/getProfileImage'

//Page component route
function Profile() {
  //Store
  const {user} = useContext(StoreContext)
  //State
  const [serverMessage, setServerMessage] = useState(["type","msg"])
  const [isMessage, setIsMessage] = useState(false)

  const [isEditName, setEditName] = useState(false)
  const [isEditEmail, setEditEmail] = useState(false)
  const [isEditImage, setEditImage] = useState(false)
  const [isEditGender, setEditGender] = useState(false)
  const [isEditBirthday, setEditBirthday] = useState(false)
  //Refs
  const nameRef = useRef("")
  const emailRef = useRef("")
  const imageRef = useRef("")
  const genderRef = useRef("")
  const birthdayRef = useRef("")
  //Profile image style logic
  const profileImage = getProfileImage(user.user.image)
  //Component method
  function editSubmit() {
    //Submit profile data for update
    //Server Response
    getEdits()
      .then((res) => {
        //If user response has .errMessage property set error message
        if(res?.errMessage) {
          setServerMessage(["text-danger", user?.errMessage])
          setIsMessage(true)
        }
        if(res) {
          user.setUser({id: res.id, name: res.name, email: res.email, image: res.image, gender: res.gender, birthday: res.birthday})
        }
      })
      .catch((err) => console.log(err))

    //Reset edited fields after submit
    if(isEditName) setEditName(false)
    if(isEditEmail) setEditEmail(false)
    if(isEditImage) setEditImage(false)
    if(isEditGender) setEditGender(false)
    if(isEditBirthday) setEditBirthday(false)
  }

  //Component method
  async function getEdits() {

    //No edits made RETURN
    if(!(isEditName || isEditEmail || isEditImage || isEditGender || isEditBirthday)) {
      setServerMessage(["text-danger", "Empty edit field"])
      setIsMessage(true)
      return
    }

    //Shorthand ref names
    let nr = nameRef?.current?.value
    let er = emailRef?.current?.value
    let ir = imageRef?.current?.value
    let gr = genderRef?.current?.value
    let br = birthdayRef?.current?.value

    //Image url pattern check
    const urlPattern = new RegExp('^(http|https)://')
    const isValidImage = ir ? ir.match(urlPattern) : false

    //Edits with no changes made RETURN
    if((isEditName && (nr === undefined || nr === "" || nr === user.user.name)) ||
      (isEditEmail && (er === undefined || er === "" || er === user.user.email)) ||
      (isEditImage && (ir === undefined || ir === "" || ir === user.user.image || !isValidImage)) ||
      (isEditGender && (gr === undefined || gr === user.user.gender)) ||
      (isEditBirthday && (br === undefined || br === "" || br === user.user.birthday))) {
        setServerMessage(["text-danger", "An edit is empty or has the same value as current"])
        setIsMessage(true)
        return
      }

    //Edits object
    let edits = {}
    //Create object with edits specified by user
    if(isEditName) edits.name = nr
    if(isEditEmail) edits.email = er
    if(isEditImage) edits.image = ir
    if(isEditGender) edits.gender = gr
    if(isEditBirthday) edits.birthday = br

    //User edited data
    let userAfterEdit = {
      id: user.user.id,
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
      user.user.id ? 
      ( <div className="profile ">
          <div className="profile-image" style={profileImage}></div>
          <div className="profile-grid-container">
            <div className="profile-keys">
              <label>Name:</label>
              <label>Email:</label>
              <label>Image:</label>
              <label>Gender:</label>
              <label>Birthday:</label>
            </div>
            <div className="profile-values">
              {isEditName ? <input ref={nameRef} placeholder={user.user.name} type="text"/> : <p>{user.user.name}</p> }
              {isEditEmail ? <input ref={emailRef} placeholder={user.user.email} type="text" /> : <p>{user.user.email}</p>}
              {isEditImage ? <input ref={imageRef} placeholder={user.user.image} type="text" /> :
                user.user.image?.length > 15 ? <p>{user.user.image.slice(0,15)+'..'}</p> : <p>{user.user.image}</p>}
              {isEditGender ?
                <select ref={genderRef} placeholder={user.user.gender}>
                  <option value="">Empty</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Variant">Variant</option>
                </select>
                : <p>{user.user.gender}</p>}
              {isEditBirthday ? <input ref={birthdayRef} placeholder={user.user.birthday} type="date" /> : <p>{user.user.birthday}</p>} 
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
            <button className="btn btn-primary me-auto" onClick={() => logout(user)}>Logout</button>
            <button className="btn btn-primary ms-auto" onClick={() => editSubmit()}>Save Edits</button>
          </div>
        </div>
        ) : (
          <h1 className="center-page">You aren't logged in Stranger!</h1>
      )
    }
    <ServerMessage isMessage={isMessage} setIsMessage={setIsMessage} msg={serverMessage}/>
    </div>
  ) 
}

export default Profile