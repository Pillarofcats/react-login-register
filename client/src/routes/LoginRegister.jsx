import Register from "../Register"
import Login from "../Login"

//Page component route
function LoginRegister({setUser}) {
  return (
    <div className="reg-log-forms">
      <Login setUser={setUser} />
      <Register/>
    </div>
  )
}

export default LoginRegister