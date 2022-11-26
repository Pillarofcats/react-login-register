
function ServerMessage({isMessage, msg}) {

  return(
    <>
      {isMessage ? <h4 className="text-danger">{msg}</h4> : <h4 className="hidden">{msg}</h4> }
    </>
  )
}

export default ServerMessage