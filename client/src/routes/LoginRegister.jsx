import Register from "../Register"
import Login from "../Login"

//Page component route
function LoginRegister() {
  return (
    <div className="reg-log-forms">
      <Login />
      <Register/>
    </div>
  )
}

export default LoginRegister