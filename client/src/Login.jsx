import React, {useRef, useState} from "react"

import ErrorMessage from "./ErrorMessage"

function Login({setUser}) {

  const loginEmailRef = useRef()
  const loginPasswordRef = useRef()

  const [errorMessage, setErrorMessage] = useState("null")
  const [isError, setIsError] = useState(false)

  async function getUser() {

    const email = loginEmailRef.current.value
    const password = loginPasswordRef.current.value

    if(!email || !password) return console.log("input form error")

    const loginFormData = {email: email, password: password}
    // const URL = "http://localhost:3000/login"
    const URL = "https://classy-steel-production.up.railway.app/login"

    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
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
          console.log("Server Response Error:", user)
          setErrorMessage(user.errMessage)
          setIsError(true)
        } else {
          console.log("Server Response Success:", user)
          //Set the userdata
          setUser({id: user.id, name: user.name, email: user.email})
          //If an error existed before successful submission, set false
          if(isError) setIsError(false)
          //Reset form inputs after successful form submission
          loginEmailRef.current.value = ""
          loginPasswordRef.current.value = ""
        }
      })
      .catch((err) => console.log(err))
  }

  return(
    <div>
      <form onSubmit={loginSubmit} className="log-form d-flex flex-column gap-2">
        <p className="h2">Login</p>
        <label htmlFor="email">Email</label>
        <input ref={loginEmailRef} type="email" name="log-email" id="log-email" required />
        <label htmlFor="password">Password</label>
        <input ref={loginPasswordRef} type="text" name="log-pass" id="log-pass" required />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>

      <ErrorMessage isError={isError} msg={errorMessage} />
    </div>
  )
}

export default Login