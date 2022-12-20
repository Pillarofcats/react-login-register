//Components
import ServerMessage from "./ServerMessage"
//Libraries
import React, {useState, useRef} from 'react'

//Component
function Register() {
  //Refs
  const registerNameRef = useRef()
  const registerEmailRef = useRef()
  const registerPasswordRef = useRef()
  //State
  const [serverMessage, setServerMessage] = useState(["type","msg"])
  const [isMessage, setIsMessage] = useState(false)

  //Method
  async function getUser() {
    //Refs
    const name = registerNameRef.current.value
    const email = registerEmailRef.current.value
    const password = registerPasswordRef.current.value
    //Form data
    const registerFormData = {uName: name, uEmail: email, uPassword: password}
    //Fetch
    const URL = "https://classy-steel-production.up.railway.app/register"
    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(registerFormData)
      })

      return await response.json()
    } catch(err) {
      console.error(err)
    }
  }

  //Method
  function registerSubmit(e) {
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
          //Reset form inputs after successful form submission
          registerNameRef.current.value = ""
          registerEmailRef.current.value = ""
          registerPasswordRef.current.value = ""
        }
      })
      .catch((err) => console.log(err))
  }
  //Render
  return(
    <div>
      <form onSubmit={registerSubmit} className='reg-form d-flex flex-column gap-2'>
        <p className="h2">Register</p>
        <label htmlFor="reg-name">Name</label>
        <input ref={registerNameRef} type="text" name="reg-email" id="reg-name" required />
        <label htmlFor='reg-email'>Email</label>
        <input ref={registerEmailRef} type="email" name="reg-email" id="reg-email" required />
        <label htmlFor="reg-pass">Password</label>
        <input ref={registerPasswordRef} type="password" name="reg-pass" id="reg-pass" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}" required />
        <small>"Password must contain: a number, uppercase character, lowercase character, and is 8-20 characters in length</small>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>

      <ServerMessage isMessage={isMessage} setIsMessage={setIsMessage} msg={serverMessage} />
    </div>
  )
}

export default Register