async function getAuthUser(usid, id) {
  //Route/End-point
  const URL = 'https://classy-steel-production.up.railway.app/authUser'
  //Fetch auth/user
  try {
    //Include credentials to send session cookie
    const response = await fetch(URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({usid: usid, id: id})
    })

    return await response.json()
  } catch(err) {
    console.error(err)
  }
}

export default getAuthUser