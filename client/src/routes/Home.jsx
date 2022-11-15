function Home({name}) {
  return(
    <>
    {
      name ? <h1 className="center-page">Welcome {name}!</h1> : (
      <h1 className="center-page">Welcome Stranger!</h1>
      )
    }
    </>
  )
}

export default Home