import ServerMessage from "./ServerMessage"

import React, {useRef, useState} from "react"

function Login({setUser}) {

  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()

  const [serverMessage, setServerMessage] = useState(["type","msg"])
  const [isMessage, setIsMessage] = useState(false)

  async function getUser() {

    const email = loginEmailRef.current.value
    const password = loginPasswordRef.current.value

    const loginFormData = {uEmail: email, uPassword: password}

    // const URL = "http://localhost:3000/login"
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
      console.log(err)
    }
  }

  function loginSubmit(e) {
    e.preventDefault()
    console.log("submit login")

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
          setUser({id: user.id, name: user.name, email: user.email, gender: user.gender, birthday: user.birthday})
          //Reset form inputs after successful form submission
          loginEmailRef.current.value = ""
          loginPasswordRef.current.value = ""
        }
      })
      .catch((err) => console.log(err))
  }

  return(
    <div>
      {console.log("cookie login", document.cookie)}
      <form onSubmit={loginSubmit} className="log-form d-flex flex-column gap-2">
        <p className="h2">Login</p>
        <label htmlFor="email">Email</label>
        <input ref={loginEmailRef} type="email" name="log-email" id="log-email" required />
        <label htmlFor="password">Password</label>
        <input ref={loginPasswordRef} type="text" name="log-pass" id="log-pass" required />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>

      <ServerMessage isMessage={isMessage} setIsMessage={setIsMessage} msg={serverMessage} />
    </div>
  )
}

export default Login