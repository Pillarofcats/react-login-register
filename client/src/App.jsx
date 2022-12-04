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

//Main
function App() {

const initUser = { 
  id: null,
  name: "",
  email: "",
  gender: "",
  birthday: "",
}

async function getAuthUser(usid, id) {
  //Route/End-point
  const URL = 'https://classy-steel-production.up.railway.app/authUser'
  //Fetch auth/user
  try {
    //Include credentials to send session cookie
    const response = await fetch(URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({usid: usid, id: id})
    })

    return await response.json()
  } catch(err) {
    console.error(err)
  }
}

//Check for session cookie
//if found GET request to sever for user associated with session cookie id
//ON APP LOAD ,[]
useEffect(()=> {
  //Get session cookie
  const usid = getSessionCookie()
  console.log('USE EFFECT cookie', usid)
  //If session cookie exists, authenticate and get user data
  if(usid) {
    console.log("sid?", usid )
    //Set session ID
    setSessionID(usid)
    //Get user id from local storage
    const id = localStorage.getItem('rrl_uid')
    console.log("UID LOCAL STORAGE", id)
    //Fetch auth/user
    console.log('set session id')
    getAuthUser(usid, id)
      .then(user => {
        if(user) {
          console.log('got user')
          const {id, name, email, gender, birthday} = user
          setUser({id: id, name: name, email: email, gender: gender, birthday: birthday})
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}, [])

function logout() {
  //Delete Cookie
  deleteSessionCookie()
  //Delete local storage item 'rll_uid'
  localStorage.removeItem('rrl_uid')
  //Set sessionID to null
  setSessionID('')
}

//LOGUT - CLEAR COOKIE IN SERVERS.JS
//res.clearCookie('user')
//redirect to login/register page

//USER ALREADY LOGGED IN?
//  useEffect(() => {
//     const loggedInUser = localStorage.getItem("user");
//     if (loggedInUser) {
//       const foundUser = JSON.parse(loggedInUser);
//       setUser(foundUser);
//     }
//   }, []);

//STORE USER IN LOCAL STORAGE
// localStorage.setItem('user', response.data)

const [user, setUser] = useState(initUser)
const [sessionID, setSessionID] = useState('')

  return (
    <div className="app">
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home sessionID={sessionID} user={user} />} />
        <Route path="/Home" element={<Navigate to="/" />} />
        <Route path="/LoginRegister" element={<LoginRegister setSessionID={setSessionID} setUser={setUser} />} />
        <Route path="/Profile" element={<Profile logout={() => logout} sessionID={sessionID} user={user} setUser={setUser}/>} />
        <Route path ="*" element={<Navigate to="/" />} />
      </Routes>
      
    </div>
  )
}

export default App
