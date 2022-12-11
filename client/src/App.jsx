//React Router Library
import { Routes, Route, Navigate} from "react-router-dom"

//Import react hooks
import {useState, useEffect, lazy} from "react"

//Components
import Navbar from "./Navbar"

//Routes
const Home = lazy(() => import("./routes/Home"))
const LoginRegister = lazy(() => import('./routes/LoginRegister'))
const Profile = lazy(() => import('./routes/Profile'))

// import Home from "./routes/Home"
// import LoginRegister from "./routes/LoginRegister"
// import Profile from "./routes/Profile"

//Helper Functions
import getSessionCookie from "./functions/getSessionCookie"
import deleteSessionCookie from "./functions/deleteSessionCookie"
import getAuthUser from "./functions/getAuthUser"
//Initial useState objects
import initUser from "./initialData/initUser"

//Main
function App() {
  //State
  const [user, setUser] = useState(() => initUser)
  //Check for session cookie
  //if found GET request to sever for user associated with session cookie id
  //ON APP LOAD ,[]
  useEffect(()=> {
    //Get session cookie
    const usid = getSessionCookie()
    //If session cookie exists, authenticate and get user data
    if(usid) {
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

  //Method
  function logout() {
    //Delete Cookie
    deleteSessionCookie()
    //Delete local storage item 'rll_uid'
    localStorage.removeItem('rrl_uid')
    //Set user
    setUser(initUser)
  }

  //Render
  return (
    <div className="app">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={ <Navbar /> }>
          <Route path="/" element={ <Home user={user} /> }/>
          <Route path="/Home" element={ <Navigate to="/" /> } />
          <Route path="/LoginRegister" element={ <LoginRegister setUser={setUser} /> } />
          <Route path="/Profile" element={ <Profile logout={logout} user={user} setUser={setUser}/> } />
          <Route path ="*" element={ <Navigate to="/" /> } />
        </Route>
      </Routes>
    </div>
  )
}

export default App
