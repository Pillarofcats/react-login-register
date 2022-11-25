async function postRegister(req, res, dbPool, bcryptjs) {
  //POST - destructed keys
  const {uName, uEmail, uPassword} = req.body
  //Add db client for register
  const client = await dbPool.connect()

  //Queries
  try {
    //Query definition, check email
    const queryCheckEmail = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [uEmail],
    }
    //Query for registered email
    const qce = await client.query(queryCheckEmail)
    //Email does not exist, register user
    if(uEmail !== qce.rows[0]?.email) {
      //Encrypt/Hash password
      const hashPass = await bcryptjs.hash(uPassword, 10)
      //Query definition
      const queryInsertUser = {
        text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING uid, name, email',
        values: [uName, uEmail, hashPass]
      }
      //Query to insert user into users database
      const qiu = await client.query(queryInsertUser)
      //Destructure query data
      const {uid, name, email} = qiu.rows[0]
      //Release client from db connection
      client.release()
      //Return uid,name, and email
      return res.status(200).send({id: uid, name: name, email: email})
    }
    //Release client from db connection
    client.release()
    //Email already exists
    return res.status(200).send({errMessage: 'Email already exists'})

  } catch(err) {
    console.error(err)
  }
}

module.exports = postRegister