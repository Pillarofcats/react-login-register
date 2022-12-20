//Components
import ServerMessage from "./ServerMessage"
//Libraries
import React, {useRef, useState} from "react"

//Component
function Login({setUser}) {
  //Refs
  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()
  //State
  const [serverMessage, setServerMessage] = useState(["type","msg"])
  const [isMessage, setIsMessage] = useState(false)

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
      .then(user => {
        //If user response has .errMessage property set error message
        if(user.errMessage) {
          setServerMessage(["text-danger", user.errMessage])
          setIsMessage(true)
        } else {
          setServerMessage(["text-success", user.resMessage])
          setIsMessage(true)
          //Set the userdata
          setUser({id: user.id, name: user.name, email: user.email, image: user.image, gender: user.gender, birthday: user.birthday})
          //Set user id to local storage
          localStorage.setItem('rrl_uid', user.id);
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