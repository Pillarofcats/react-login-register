//Components
import ServerMessage from "./ServerMessage"
//Libraries
import React, {useRef, useState, useContext} from "react"
import { StoreContext } from "./StoreContextProvider"

//Component
function Login() {
  //Store
  const {user} = useContext(StoreContext)
  //State
  const [serverMessage, setServerMessage] = useState(["type","msg"])
  const [isMessage, setIsMessage] = useState(false)
  //Refs
  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()

  //Method
  async function getUser() {
    //Refs
    const email = loginEmailRef.current.value
    const password = loginPasswordRef.current.value
    //Form data
    const loginFormData = {uEmail: email, uPassword: password}
    //Fetch
    const URL = "https://classy-steel-production.up.railway.app/login"
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify(loginFormData)
      })

      return await response.json()
    } catch(err) {
      console.error(err)
    }
  }

  //Method
  function loginSubmit(e) {
    e.preventDefault()
    //Server Response
    getUser()
      .then(res => {
        //If user response has .errMessage property set error message
        if(res.errMessage) {
          setServerMessage(["text-danger", res.errMessage])
          setIsMessage(true)
        } else {
          setServerMessage(["text-success", res.resMessage])
          setIsMessage(true)
          //Set the userdata
          user.setUser({id: res.id, name: res.name, email: res.email, image: res.image, gender: res.gender, birthday: res.birthday})
          //Set user id to local storage
          localStorage.setItem('rrl_uid', res.id);
          //Reset form inputs after successful form submission
          loginEmailRef.current.value = ""
          loginPasswordRef.current.value = ""
        }
      })
      .catch((err) => console.log(err))
  }

  //Render
  return(
    <div>
      <form onSubmit={loginSubmit} className="log-form d-flex flex-column gap-2">
        <p className="h2">Login</p>
        <label htmlFor="email">Email</label>
        <input ref={loginEmailRef} type="email" name="log-email" id="log-email" required />
        <label htmlFor="password">Password</label>
        <input ref={loginPasswordRef} type="password" name="log-pass" id="log-pass" required />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>

      <ServerMessage isMessage={isMessage} setIsMessage={setIsMessage} msg={serverMessage} />
    </div>
  )
}

export default Login