async function postDiaryEntry(req, res, dbPool) {

  const {id, uDiary} = req.body

  if(!id || !uDiary) res.end()

  const userDiary = JSON.stringify(uDiary)

  try {
    //Add db client for profile edit
    const client = await dbPool.connect()

    const qs = `UPDATE users SET diary='${userDiary}' WHERE uid = $1 RETURNING diary`
    //Query definition
    const queryDiaryEntry = {
      text: qs,
      values: [id]
    }
    //Query email to see if it exists with login email
    const qde = await client.query(queryDiaryEntry)

    const {diary} = qde.rows[0]

    //Release client from db
    client.release()
    //Successful response
    return res.status(200).send({diary: diary.entries})
  } catch(err) {
    console.error(err)
  }
}

module.exports = postDiaryEntry