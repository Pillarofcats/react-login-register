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

//Main
function App() {

const initUser = { 
  id: null,
  name: "",
  email: "",
  gender: "",
  birthday: "",
}

async function getAuthUser(sID) {
  //Route/End-point
  const URL = 'https://classy-steel-production.up.railway.app/authUser'
  //Fetch auth/user
  try {
    //Include credentials to send session cookie
    const response = await fetch(URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      credentials: 'include',
      body: JSON.stringify({sid: sID})
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
  const sID = getSessionCookie()
  console.log('USE EFFECT cookie', sID)
  //If session cookie exists, authenticate and get user data
  if(sID) {
    console.log("sid?", sID )
    //Set session ID
    setSessionID(sID)
    //Fetch auth/user
    getAuthUser(sID)
      .then(user => {
        if(user) {
          const {id, name, email, gender, birthday} = user
          setUser({id: id, name: name, email: email, gender: gender, birthday: birthday})
        }
      })
      .catch((err) => console.error(err))
  }
},[])

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
        <Route path="/" element={<Home name={user.name} />} />
        <Route path="/Home" element={<Navigate to="/" />} />
        <Route path="/LoginRegister" element={<LoginRegister setUser={setUser} />} />
        <Route path="/Profile" element={<Profile user={user} logout={() => setUser(initUser)} setUser={setUser}/>} />
        <Route path ="*" element={<Navigate to="/" />} />
      </Routes>
      
    </div>
  )
}

export default App
