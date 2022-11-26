
import ServerMessage from "./ServerMessage"

import React, {useState, useRef} from 'react'

function Register() {

  const registerNameRef = useRef()
  const registerEmailRef = useRef()
  const registerPasswordRef = useRef()

  const [serverMessage, setServerMessage] = useState(["type","msg"])
  const [isMessage, setIsMessage] = useState(false)

  async function getUser() {
    
    const name = registerNameRef.current.value
    const email = registerEmailRef.current.value
    const password = registerPasswordRef.current.value

    const registerFormData = {uName: name, uEmail: email, uPassword: password}
    // const URL = "http://localhost:3000/register"
    const URL = "https://classy-steel-production.up.railway.app/register"

    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(registerFormData)
      })

      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

  function registerSubmit(e) {
    e.preventDefault()
    console.log("submit register")

    getUser()
      .then(user => {
        //If user response has .errMessage property set error message
        if(user?.errMessage) {
          setServerMessage(["text-danger", user.errMessage])
          setIsMessage(true)
        } else {
          setServerMessage(["text-success", user.resMessage])
          setIsMessage(true)
          //Reset form inputs after successful form submission
          registerNameRef.current.value = ""
          registerEmailRef.current.value = ""
          registerPasswordRef.current.value = ""
        }
      })
      .catch((err) => console.log(err))
  }

  return(
    <div>
      <form onSubmit={registerSubmit} className='reg-form d-flex flex-column gap-2'>
        <p className="h2">Register</p>
        <label htmlFor="reg-name">Name</label>
        <input ref={registerNameRef} type="text" name="reg-email" id="reg-name" required />
        <label htmlFor='reg-email'>Email</label>
        <input ref={registerEmailRef} type="email" name="reg-email" id="reg-email" required />
        <label htmlFor="reg-pass">Password</label>
        <input ref={registerPasswordRef} type="text" name="reg-pass" id="reg-pass" required />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>

      <ServerMessage isMessage={isMessage} setIsMessage={setIsMessage} msg={serverMessage} />
    </div>
  )
}

export default Register