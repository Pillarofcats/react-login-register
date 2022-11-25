//Express library
const express = require('express')
//Enable cross-origin resource sharing
const cors = require('cors')
//Password encryption
const bcryptjs = require('bcryptjs')
//Parse Cookies
const cookieParser = require('cookie-parser')
//Environment variable config
const dotenv = require('dotenv').config()
//Create express app
const app = express()
//Import database (PSQL)
const dbPool = require('./db')
//Cors options
const corsOptions = require('./corsOptions')

//Middleware cross-origin resource sharing (config)
app.use(cors(corsOptions))
//Middleware parsing application/json
app.use(express.json())
//Middleware parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
//Middleware parsing cookies
app.use(cookieParser())

//Controllers
const postRegister = require('./controllers/postRegister')
const postLogin = require('./controllers/postLogin')

//Default end-point/route
app.get('/', (req,res) => {
  res.status(200).send('Server is live..')
})

//Register end-point/route
app.post('/register', (req, res) => postRegister(req, res, dbPool, bcryptjs))

//Login end-point/route
app.post('/login', (req, res) => postLogin(req, res, dbPool, bcryptjs))

//saveEdits end-point/route
app.post('/saveEdits', async (req, res) => {
  console.log('cookies', req.cookies.user)
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
    const quu = await dbPool.query(queryUserUpdate)
    //Destructure query data
    const {uid, name, email, gender, birthday} = quu.rows[0]
    //Format birthday
    const bDay = birthday ? `${birthday.getMonth()+1}-${birthday.getDate()}-${birthday.getFullYear()}` : birthday
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