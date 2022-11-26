
function ServerMessage({isMessage, msg}) {

  return(
    <>
      {isMessage ? <h4 className={msg[0]}>${msg[1]}</h4> : <h4 className="hidden">{msg[1]}</h4> }
    </>
  )
}

export default ServerMessage