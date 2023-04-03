//React Router Library
import { Routes, Route, Navigate} from "react-router-dom"

//Import react hooks
import {useEffect, useContext, lazy} from "react"

//Components
import Navbar from "./Navbar"

//Routes
const Home = lazy(() => import("./routes/Home"))
const LoginRegister = lazy(() => import('./routes/LoginRegister'))
const Profile = lazy(() => import('./routes/Profile'))

//Helper Functions
import getSessionCookie from "./functions/getSessionCookie"
import deleteSessionCookie from "./functions/deleteSessionCookie"
import getAuthUser from "./functions/getAuthUser"
import { StoreContext } from "./StoreContextProvider"

//Main
function App() {

  //Store
  const {user} = useContext(StoreContext)

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
        .then(res => {
          if(res) {
            //Destructure user data
            const {id, name, email, image, gender, birthday} = res
            user.setUser({id: id, name: name, email: email, image: image, gender: gender, birthday: birthday})
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [])

  //Render
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={ <Navbar /> }>
          <Route path="/" element={ <Home /> }/> 
          <Route path="/Home" element={ <Navigate to="/" /> } />
          <Route path="/LoginRegister" element={ <LoginRegister /> } />
          <Route path="/Profile" element={ <Profile /> } />
          <Route path ="*" element={ <Navigate to="/" /> } />
        </Route>
      </Routes>
    </div>
  )
}

export default App
