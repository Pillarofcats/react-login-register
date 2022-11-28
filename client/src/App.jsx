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

function initUser () {
  return { 
    id: null,
    name: "",
    email: "",
    gender: "",
    birthday: "",
  }
}

//Check for session cookie
//if found GET request to sever for user associated with session cookie id
//ON APP LOAD ,[]
useEffect(()=> {
  const sID = getSessionCookie()
  console.log("sID", sID)
  if(sID) setSessionID(sID)
}, [])

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

const [user, setUser] = useState(() => initUser())
const [sessionID, setSessionID] = useState('')

  console.log("session", sessionID)

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
