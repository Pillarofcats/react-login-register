import React, {useEffect} from 'react'

//Component
function ServerMessage({isMessage, setIsMessage, msg}) {


  useEffect(() => {

    const timer = setTimeout(() => {
      setIsMessage(false)
    }, 5000);

    return () => {
      clearTimeout(timer)
    }
  }, [])
  

  //Render
  return (
    <>
    {isMessage ? <h4 className={`${msg[0]} server-msg`}>{msg[1]}</h4> : <h4 className="hidden server-msg">{msg[1]}</h4>}
    </>
  )
}

export default ServerMessage