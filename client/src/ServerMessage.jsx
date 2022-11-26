
function ServerMessage({isMessage, msg}) {

  return(
    <>
      {isMessage ? msg : <h4 className="hidden">{msg}</h4> }
    </>
  )
}

export default ServerMessage