async function postUpdateDiaryEntry(req, res, dbPool) {

  const {id, index} = req.body

  if(!id || !index) res.end()

  try {
    //Add db client for profile edit
    const client = await dbPool.connect()

    const queryGetDiary = {
      text: 'SELECT diary FROM users WHERE uid = $1',
      values: [id]
    }

    const qgd = await client.query(queryGetDiary)
    
    const {diary} = qgd.rows[0]

    diary = JSON.parse(diary)

    const filterDiary = diary.entries.filter((_, ind) => ind !== index)

    const userDiary = JSON.stringify({entries: filterDiary})

    const qs = `UPDATE users SET diary='${userDiary}' WHERE uid = $1 RETURNING diary`
    //Query definition
    const queryDiaryEntry = {
      text: qs,
      values: [id]
    }
    //Query email to see if it exists with login email
    const qde = await client.query(queryDiaryEntry)

    const {diary: updatedDiary} = qde.rows[0]
    //Release client from db
    client.release()
    //Successful response
    return res.status(200).send({updatedDiary})
  } catch(err) {
    console.error(err)
  }
}

module.exports = postUpdateDiaryEntry