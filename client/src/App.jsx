//Components
import Navbar from "./Navbar"

//Routes
import Home from "./routes/Home"
import LoginRegister from "./routes/LoginRegister"
import Profile from "./routes/Profile"

//React Router Library
import { Routes, Route} from "react-router-dom"

//Hooks
import {useState} from "react"

//Main
function App() {

const initUser = {
  id: null,
  name: null,
  email: null,
}

const [user, setUser] = useState(initUser)

  console.log("user data:", user)

  return (
    <div className="app">
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home name={user.name} />} />
        <Route path="LoginRegister" element={<LoginRegister setUser={setUser} />} />
        <Route path="Profile" element={<Profile user={user} />} />
      </Routes>
      
    </div>
  )
}

export default App
