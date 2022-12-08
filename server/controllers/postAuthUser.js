async function postAuthUser(req, res, dbPool, cryptojs) {
  //POST data
  const {usid, id} = req.body
  //IF either are false end
  if(!(usid || id)) return res.end()
  //Add db client for profile edit
  const client = await dbPool.connect()

  try {
    //DECODEURI usid from "POST" is URL ENCODEDED, so "/" -> %20, the database stores the sid URL DECODED
    const decUsid = decodeURIComponent(usid)
    //DECRYPT usid
    let startDecrypt = cryptojs.AES.decrypt(`${decUsid}`, `${process.env.ENCRYPT_SECRET}`);
    let decryptedSessionID = startDecrypt.toString(cryptojs.enc.Utf8)
    //Query Definition
    const querySessionID = {
      text: 'SELECT email, uid FROM users WHERE sid = $1 AND uid = $2',
      values: [decUsid, id]
    }
    //Query Session ID
    const qsid = await client.query(querySessionID);
    //Destructure query data
    const {email} = qsid.rows[0]
    //Query email ===? decrypted sessionID email
    if(email === decryptedSessionID) {
      //Query Definition
      const queryUserEmail = {
        text: 'SELECT * FROM users WHERE email = $1', 
        values: [decryptedSessionID]
      }
      //Query user email
      const que = await client.query(queryUserEmail)
      //Destructure query data
      const {uid, name, image, gender, birthday} = que.rows[0]
      //Format birthday
      const bDay = birthday ? `${birthday.getMonth()+1}-${birthday.getDate()}-${birthday.getFullYear()}` : ""
      //Release client from db
      client.release()
      //Successful response
      return res.status(200).send({id: uid, name: name, email: email, image: image, gender: gender, birthday: bDay})
    }
    //Failed auth
    return res.status(404).end()
  //Error
  } catch(err) {
    console.error(err)
  }
}

module.exports = postAuthUser