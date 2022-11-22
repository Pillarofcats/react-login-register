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

function initUser () {
  return { 
    id: null,
    name: "",
    email: "",
    gender: "",
    birthday: "",
  }
}

const [user, setUser] = useState(() => initUser())
  console.log("user data:", user)

  return (
    <div className="app">
      <Navbar />
    
      <Routes>
        <Route path="/" element={<Home name={user.name} />} />
        <Route path="Home" element={<Home name={user.name} />} />
        <Route path="LoginRegister" element={<LoginRegister setUser={setUser} />} />
        <Route path="Profile" element={<Profile user={user} logout={() => setUser(initUser)} setUser={setUser}/>} />
        <Route path ="*" element={<Redirect to="Home" />} />
      </Routes>
      
    </div>
  )
}

export default App
