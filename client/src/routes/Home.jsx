function Home({name}) {
  return(
    <>
    {console.log("cookie home", document.cookie)}
    {
      name ? (
        <div className="center-page">
          <h1 className="home">Welcome {name.length > 15 ? name.slice(0,15)+".." : name} !</h1> 
          <p>Feed</p>
          <p>Targeted Articles</p>
        </div>  
      ) : (
      <h1 className="center-page">Welcome Stranger!</h1>
      )
    }
    </>
  )
}

export default Home