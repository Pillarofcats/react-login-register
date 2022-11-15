
function ErrorMessage({isError, msg}) {

  return(
    <>
      {isError ? <h4 className="text-danger">{msg}</h4> : <h4 className="hidden">{msg}</h4> }
    </>
  )
}

export default ErrorMessage