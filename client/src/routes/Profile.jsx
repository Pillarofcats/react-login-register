import React, {useState, useRef} from 'react'

function Profile({user, logout, setUser}) {

  const [isEditName, setEditName] = useState(false)
  const [isEditEmail, setEditEmail] = useState(false)
  const [isEditGender, setEditGender] = useState(false)
  const [isEditBirthday, setEditBirthday] = useState(false)

  const nameRef = useRef()
  const emailRef = useRef()
  const genderRef = useRef()
  const birthdayRef = useRef()

  function editSubmit() {
    //Submit profile data for update
    getEdits()
      .then((user) => {
        console.log("profile data", user)
        setUser({id: user.id, name: user.name, email: user.email, gender: user.gender, birthday: user.birthday})
      })
      .catch((err) => console.log(err))

    //Reset edited fields after submit
    if(isEditName) setEditName(false)
    if(isEditEmail) setEditEmail(false)
    if(isEditGender) setEditGender(false)
    if(isEditBirthday) setEditBirthday(false)
  }

  async function getEdits() {

    if(!(isEditName || isEditEmail || isEditGender || isEditBirthday)) return console.log("no edits")

    console.log("saving edits..")

    let edits = {}

    if(isEditName && nameRef.current.value !== user.name) edits.name = nameRef.current.value
    if(isEditEmail && emailRef.current.value !== user.email) edits.email = emailRef.current.value
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
      console.log("USER EDITS:", userAfterEdit)
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
      user.name ? 
      ( <div className="profile ">
          <div className="profile-grid-container">
            <div className="profile-keys">
              <label>Name:</label>
              <label>Email:</label>
              <label>Gender:</label>
              <label>Birthday:</label>
            </div>
            <div className="profile-values">
              {isEditName ? <input ref={nameRef} placeholder={user.name} type="text"/> : <p>{user.name}</p> }
              {isEditEmail ? <input ref={emailRef} placeholder={user.email} type="text" /> : <p>{user.email}</p>}
              {isEditGender ?
                <select ref={genderRef} placeholder={user.gender}>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                : <p>{user.gender}</p>}
              {isEditBirthday ? <input ref={birthdayRef} placeholder={user.birthday} type="date" /> : <p>{user.birthday}</p>} 
            </div>
            <div className="profile-edits">
              <button className="btn btn-primary" onClick={() => setEditName(prev => !prev)}>edit</button>
              <button className="btn btn-primary" onClick={() => setEditEmail(prev => !prev)}>edit</button>
              <button className="btn btn-primary" onClick={() => setEditGender(prev => !prev)}>edit</button>
              <button className="btn btn-primary" onClick={() => setEditBirthday(prev => !prev)}>edit</button>
            </div>
          </div>
          <div className="profile-logout-save-btns">
            <button className="btn btn-primary me-auto" onClick={logout}>Logout</button>
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