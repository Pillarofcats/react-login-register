//Components
import Navbar from "./Navbar"

//Routes
import Home from "./routes/Home"
import LoginRegister from "./routes/LoginRegister"
import Profile from "./routes/Profile"

//React Router Library
import { Routes, Route, Navigate} from "react-router-dom"

//Hooks
import {useState, useEffect} from "react"

//Helper Functions
import getSessionCookie from "./functions/getSessionCookie"
import deleteSessionCookie from "./functions/deleteSessionCookie"
import getAuthUser from "./functions/getAuthUser"
//Initial useState objects
import initUser from "./initialData/initUser"

//Main
function App() {

//Check for session cookie
//if found GET request to sever for user associated with session cookie id
//ON APP LOAD ,[]
useEffect(()=> {
  //Get session cookie
  const usid = getSessionCookie()
  //If session cookie exists, authenticate and get user data
  if(usid) {
    // //Set session ID
    // setSessionID(usid)
    //Get user id from local storage
    const id = localStorage.getItem('rrl_uid')
    //Fetch auth/user
    getAuthUser(usid, id)
      .then(user => {
        if(user) {
          //Destructure user data
          const {id, name, email, image, gender, birthday} = user
          setUser({id: id, name: name, email: email, image: image, gender: gender, birthday: birthday})
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}, [])

function logout() {
  console.log('logout')
  //Delete Cookie
  deleteSessionCookie()
  //Delete local storage item 'rll_uid'
  localStorage.removeItem('rrl_uid')
  // //Set sessionID to null
  // setSessionID("")
  //Set user
  setUser(initUser)
}

const [user, setUser] = useState(() => initUser)
// const [sessionID, setSessionID] = useState("")

  return (
    <div className="app">
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/Home" element={<Navigate to="/" />} />
        <Route path="/LoginRegister" element={<LoginRegister setUser={setUser} />} />
        <Route path="/Profile" element={<Profile logout={logout} user={user} setUser={setUser}/>} />
        <Route path ="*" element={<Navigate to="/" />} />
      </Routes>
      
    </div>
  )
}

export default App
