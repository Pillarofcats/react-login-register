async function postEditProfile (req, res, dbPool) {

  console.log(JSON.stringify(req.headers.cookie))



  try {

    //Destructure object data
    const {id, edits} = req.body
    //Add db client for profile edit
    const client = await dbPool.connect()
    //Array holds strings of key values from user submitted edits
    let qsEdits = []
    //Loop through creating key = value strings for database update query definition
    for(let [key, value] of Object.entries(edits)) {
      qsEdits.push(`${key} = '${value}'`)
    }

    //Create query definition from edits in the form: column=value
    const qs = `UPDATE users SET ${[...qsEdits]} WHERE uid = $1 RETURNING uid, name, email, gender, birthday`
    //Query definition, change user properties based on what properties changed in database
    const queryUserUpdate = {
      text: qs,
      values: [id]
    }
    //Query update user data
    const quu = await client.query(queryUserUpdate)
    //Destructure query data
    const {uid, name, email, image, gender, birthday} = quu.rows[0]
    //Format birthday
    const bDay = birthday ? `${birthday.getMonth()+1}-${birthday.getDate()}-${birthday.getFullYear()}` : birthday
    //Release client from db connection
    client.release()
    //Return user data after updating db
    return res.status(200).send({id: uid, name: name, email: email, image: image, gender: gender, birthday: bDay})
  } catch(err) {
    console.error(err)
  }
  //Error
  return res.status(500).send('Error updating user data to db')
}

module.exports = postEditProfile