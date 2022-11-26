async function postLogin (req, res, dbPool, bcryptjs) {
  console.log('session.id', req.session.id)
  console.log('sessionID', req.sessionID)
  //POST - destructed keys
  const {uEmail, uPassword} = req.body
  //Get client cookies
  const cookies = req.cookies
  console.log(cookies)
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
    console.log('qev', qev.rows[0]?.email)
    if(uEmail !== qev.rows[0]?.email) {
      console.log('email NOT valid')
      return res.status(200).send({errMessage: "Email doesn't exist"})
    }
    //Query definition
    const queryEmailPassword = {
      text: 'SELECT password FROM users WHERE email = $1',
      values: [uEmail]
    }
    console.log('query hash pass')
    //Query email for hashed password
    const qep = await client.query(queryEmailPassword)
    console.log('pass', qep.rows[0].password)
    //Password comapare with bcryptjs
    const passMatch = await bcryptjs.compare(uPassword, qep.rows[0].password)
    //Succesful login
    if(passMatch) {
      console.log('password match')
      //Query definition
      const queryUser = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [uEmail]
      }
      console.log('query user data')
      //Query user data to be sent back to client
      const qe = await client.query(queryUser)
      //Destructure query data
      const {uid, name, email, gender, birthday} = qe.rows[0]
      //Format birthday
      const bDay = birthday ? `${birthday.getMonth()+1}-${birthday.getDate()}-${birthday.getFullYear()}` : birthday
      //Release client from db connection
      client.release()
      //Server response with user data & 5 min cookie
      return res.cookie('user', email, { maxAge: 300000, secure: true, sameSite:'None', expires: 0 })
                .status(200)
                .send({resMessage: 'Login Successful', id: uid, name: name, email: email, gender: gender, birthday: bDay})
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