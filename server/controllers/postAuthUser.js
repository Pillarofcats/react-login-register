async function postAuthUser(req, res, dbPool, cryptojs) {

  console.log('cookies', JSON.stringify(req.headers.cookie))

  //Add db client for profile edit
  const client = await dbPool.connect()
  //POST data
  const {usid} = req.body
  //The usid from "POST" is URL ENCODEDED, so "/" -> %20, the database stores the sid URL DECODED
  const decUsid = decodeURIComponent(usid)
  try {

    console.log('deccomp', decUsid)
    //DECRYPT usid
    let startDecrypt = cryptojs.AES.decrypt(`${decUsid}`, `${process.env.ENCRYPT_SECRET}`);
    let decryptedSessionID = startDecrypt.toString(cryptojs.enc.Utf8)

    console.log('decrypted', decryptedSessionID)

    //Query Definition
    const querySessionID = {
      text: 'SELECT email FROM users WHERE sid = $1',
      values: [decUsid]
    }
    //Query Session ID
    const qsid = await client.query(querySessionID);
    //Destructure query data
    console.log('query', qsid)
    const {email} = qsid.rows[0]
    // console.log('querySID', email)

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
    return res.status(404).end()
  //Error
  } catch(err) {
    console.error(err)
  }
}

module.exports = postAuthUser