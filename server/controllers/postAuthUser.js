async function postAuthUser(req, res, dbPool, cryptojs) {

  console.log('cookies', JSON.stringify(req.headers.cookie))

  try {
    //POST data
    const {usid} = req.body
    console.log("sid", typeof usid, usid)
    //Connect client to db
    const client = await dbPool.connect()
    //DECRYPT usid
    const startDecrypt = cryptojs.AES.decrypt(usid, process.env.ENCRYPT_SECRET);
    const decryptedSessionID = startDecrypt.toString(cryptojs.enc.Utf8)
    console.log('decrypted', decryptedSessionID)

    //Query Definition
    const querySessionID = {
      text: 'SELECT email FROM users WHERE sid = $1',
      values: [usid]
    }
    //Query Session ID
    const qsid = await client.query(querySessionID)
    //Destructure query data
    console.log('query', qsid)
    const {email} = qsid.rows[0]
    console.log('querySID', email)

    //Query email ===? decrypted sessionID email
    if(email === decryptedSessionID) {
      console.log('email = decrypt')
      //Query Definition
      const queryUserEmail = {
        text: 'SELECT * FROM users WHERE email = $1', 
        values: [decryptedSessionID]
      }
      //Query user email
      const que = await client.query(queryUserEmail)
      //Destructure query data
      const {uid, name, gender, birthday} = que.rows[0]
      //Release client from db
      client.release()
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