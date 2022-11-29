async function postLogin (req, res, dbPool, bcryptjs, cryptojs, cookieSessionOptions) {
  //POST - destructed keys
  const {uEmail, uPassword} = req.body
  //Add db client for login
  const client = await dbPool.connect()

  try {
    //Query definition
    const queryEmailValid = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [uEmail]
    }
    //Query email to see if it exists with login email
    const qev = await client.query(queryEmailValid)
    //Validate email
    if(uEmail !== qev.rows[0]?.email) {
      return res.status(200).send({errMessage: "Email doesn't exist"})
    }
    //Query definition
    const queryEmailPassword = {
      text: 'SELECT password FROM users WHERE email = $1',
      values: [uEmail]
    }
    //Query email for hashed password
    const qep = await client.query(queryEmailPassword)
    //Password comapare with bcryptjs
    const passMatch = await bcryptjs.compare(uPassword, qep.rows[0].password)
    //Succesful login
    if(passMatch) {
      //Query definition
      const queryUser = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [uEmail]
      }
      //Query user data to be sent back to client
      const qe = await client.query(queryUser)
      //Destructure query data
      const {uid, name, email, gender, birthday} = qe.rows[0]
      //Format birthday
      const bDay = birthday ? `${birthday.getMonth()+1}-${birthday.getDate()}-${birthday.getFullYear()}` : birthday
      //Create sessionID and Hash
      const encryptSessionID = cryptojs.AES.encrypt(uEmail, `${process.env.ENCRYPT_SECRET}`).toString()
      //Query definition
      const queryUpdateSession = {
        text: `UPDATE users SET sid='${encryptSessionID}' WHERE email = $1`,
        values: [uEmail]
      }
      //Store sessionID into db
      const qus = await client.query(queryUpdateSession)
      //Set session ID cookie
      res.cookie('sessionID', encryptSessionID, cookieSessionOptions)
      //Release client from db connection
      client.release()
      //Return response message and data, session id cookie will be set
      return res.status(200).send({resMessage: 'Login Successful', id: uid, name: name, email: email, gender: gender, birthday: bDay})
    }
    //Release client from db connection
    client.release()
    //Unsuccessful login
    return res.status(200).send({errMessage: 'Password incorrect'})
  } catch(err) {
    console.error(err)
  }
}

module.exports = postLogin