async function postAuthUser(req, res, dbPool, cryptojs) {

  console.log('what', JSON.stringify(req.headers.cookie))

  try {
    //POST data
    const {usid} = req.body
    console.log("sid", usid)
    //Connect client to db
    const client = await dbPool.connect()
    //DECRYPT usid
    const startDecrypt = await cryptojs.AES.decrypt(usid, process.env.ENCRYPT_SECRET);
    const decryptedSessionID = await startDecrypt.toString(cryptojs.enc.Utf8)
    console.log('decrypted', decryptedSessionID)

    //Query Definition
    const querySessionID = {
      text: 'SELECT email, sid FROM users WHERE sid = $1',
      values: [usid]
    }
    //Query Session ID
    const qSID = await client.query(querySessionID)
    //Destructure query data
    const {email, sid} = qSID.rows[0]
    console.log('querySID', email, sid)

    //Query email ===? decrypted sessionID email
    if(email === decryptedSessionID) {
      //Query Definition
      const queryUserEmail = {
        text: 'SELECT * FROM users WHERE email = $1', 
        values: [decryptedSessionID]
      }
      //Query user email
      const qUE = await client.query(queryUserEmail)
      //Destructure query data
      const {uid, name, gender, birthday} = qUE.rows[0]
      //Successful response
      return res.status(200).send({id: uid, name: name, email: email, gender: gender, birthday: birthday})
    }
    //Failed auth
    return res.status(404)
  //Error
  } catch(err) {
    console.error(err)
  }
}

module.exports = postAuthUser