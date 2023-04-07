
async function updateDiaryEntry(id, index) {

  const URL = 'https://classy-steel-production.up.railway.app/updateDiaryEntry'

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify({id, index})
    })

    return await response.json()
  } catch(err) {
      return console.log(err)
  }
}

export default updateDiaryEntry