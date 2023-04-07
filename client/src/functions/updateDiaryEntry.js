
async function updateDiaryEntry(id, index) {
  
  console.log('id', id, 'index', index)

  const URL = 'https://classy-steel-production.up.railway.app/updateDiaryEntry'

  const postData = {id: id, index: index}

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify(postData)
    })

    return await response.json()
  } catch(err) {
      console.error(err)
  }
}

export default updateDiaryEntry