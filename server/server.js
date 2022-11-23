const express = require('express')
const cors = require('cors')
const bcryptjs = require('bcryptjs')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()

const app = express()
//Import database (PSQL)
const db = require('./db')
//Middleware cross-origin resource sharing (config)
app.use(cors())
//Middleware parsing application/json
app.use(express.json())
//Middleware parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
//Middleware parsing cookies
app.use(cookieParser())

//Default end-point/route
app.get('/', (req,res) => {
  res.status(200).send('Server is live..')
})

//Register end-point/route
app.post('/register', async (req,res) => {
  //POST - destructed keys
  const {name, email, password} = req.body

  //Queries
  try {
    //Query definition, check email
    const queryCheckEmail = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    }
    //Query for registered email
    const qce = await db.query(queryCheckEmail)
    //Email does not exist, register user
    if(email !== qce.rows[0]?.email) {
      //Encrypt/Hash password
      const hashPass = await bcryptjs.hash(password, 10)
      //Query definition
      const queryInsertUser = {
        text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING uid, name, email',
        values: [name, email, hashPass]
      }
      //Query to insert user into users database
      const qiu = await db.query(queryInsertUser)
      //Return uid,name, and email
      return res.status(200).send({id: qiu.rows[0]?.uid, name: qiu.rows[0]?.name, email: qiu.rows[0]?.email, gender: "", birthday: ""})
    }
    //Email already exists
    return res.status(200).send({errMessage: 'Email already exists'})

  } catch(err) {
    console.error(err)
  }
  //Error fallback
  return res.status(500).send({errMessage: 'Register failed'})
})

//Login end-point/route
app.post('/login', async (req, res) => {
  //POST - destructed keys
  const {email, password} = req.body
  console.log(email, password)
  //Query definition
  const queryEmailValid = {
    text: 'SELECT email FROM users WHERE email = $1',
    values: [email]
  }
  //test
  // res.setHeader('Content-Type', 'application/json')

  try {
    //Query email to see if it exists with login email
    console.log('query email')
    const qev = await db.query(queryEmailValid)
    //Validate email
    if(email !== qev.rows[0]?.email) {
      console.log('email NOT valid')
      return res.status(200).send({errMessage: "Email doesn't exist"})
    }
    //Query definition
    const queryEmailPassword = {
      text: 'SELECT password FROM users WHERE email = $1',
      values: [email]
    }
    console.log('query hash pass')
    //Query email for hashed password
    const qep = await db.query(queryEmailPassword)
    console.log('pass', qep.rows[0]?.password)
    //Password comapare with bcryptjs
    const passMatch = await bcryptjs.compare(password, qep.rows[0]?.password)
    //Succesful login
    if(passMatch) {
      console.log('password match')
      //Query definition
      const queryUser = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
      }
      console.log('query user data')
      //Query user data to be sent back to client
      const qe = await db.query(queryUser)
      //Set user cookie
      const timeMinutes = Date.now() / (1000 * 60)
      res.cookie('user', email, { expires: timeMinutes + 5, secure: true })
      //Server response with user fata
      return res.status(200).send({id: qe.rows[0].uid, name: qe.rows[0].name, email: qe.rows[0].email, gender: qe.rows[0].gender, birthday: qe.rows[0].birthday})
    }
    //Unsuccessful login
    return res.status(200).send({errMessage: 'Password incorrect'})
  } catch(err) {
    console.error(err)
  }
})


//saveEdits end-point/route
app.post('/saveEdits', async (req, res) => {
  console.log(req.cookies)
  //Destructure object data
  const {id, edits} = req.body
  console.log('user edits', edits)

  try {
    //Array holds strings of key values from user submitted edits
    let qsEdits = []
    //Loop through creating key = value strings for database update query definition
    for(let [key, value] of Object.entries(edits)) {
      qsEdits.push(`${key} = '${value}'`)
    }

    //Create query definition from edits in the form: column=value
    const qs = `UPDATE users SET ${[...qsEdits]} WHERE uid = $1 RETURNING uid,name,email,gender,birthday`
    console.log(qs)
    //Query definition, change user properties based on what properties changed in database
    const queryUserUpdate = {
      text: qs,
      values: [id]
    }
    //Query update user data
    const quu = await db.query(queryUserUpdate)
    //Destructure query data
    const {uid, name, email, gender, birthday} = quu.rows[0]
    //Format birthday
    const bDay = `${birthday.getMonth()+1}-${birthday.getDate()}-${birthday.getFullYear()}`
    //Return user data after updating db
    return res.status(200).send({id: uid, name: name, email: email, gender: gender, birthday: bDay})
  } catch(err) {
    console.error(err)
  }
  //Error
  return res.status(500).send('Error updating user data to db')
})

//Set port production/local
const PORT = process.env.PORT || 3000

//Server active on specified port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})