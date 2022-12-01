import Register from "../Register"
import Login from "../Login"

function LoginRegister({setSessionID, setUser}) {
  return (
    <div className="reg-log-forms">
      <Login setSessionID={setSessionID} setUser={setUser} />
      <Register/>
    </div>
  )
}

export default LoginRegister