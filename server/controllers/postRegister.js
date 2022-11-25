export async function postRegister(req, res) {
  //POST - destructed keys
  const {uName, uEmail, uPassword} = req.body

  //Queries
  try {
    //Query definition, check email
    const queryCheckEmail = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [uEmail],
    }
    //Query for registered email
    const qce = await db.query(queryCheckEmail)
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
      const qiu = await db.query(queryInsertUser)
      //Destructure query data
      const {uid, name, email} = qiu.rows[0]
      //Return uid,name, and email
      return res.status(200).send({id: uid, name: name, email: email})
    }
    //Email already exists
    return res.status(200).send({errMessage: 'Email already exists'})

  } catch(err) {
    console.error(err)
  }
  //Error fallback
  return res.status(500).send({errMessage: 'Register failed'})
}