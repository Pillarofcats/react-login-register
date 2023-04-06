async function postDiaryEntry(req, res, dbPool) {

  const {id, uDiary} = req.body
  console.log('id', id, 'diary', uDiary)

  if(!id || !uDiary) res.end()

  const diary = JSON.stringify(uDiary)

  try {
    //Add db client for profile edit
    const client = await dbPool.connect()
    //Query definition
    const queryDiaryEntry = {
      text: 'INSERT INTO usertext(uid, text) VALUES($1, $2) RETURNING text',
      values: [id, diary]
    }
    //Query email to see if it exists with login email
    const qde = await client.query(queryDiaryEntry)
    //Release client from db
    client.release()
    //Successful response
    return res.status(200).send(qde)
  } catch(err) {
    console.error(err)
  }
}

module.exports = postDiaryEntry