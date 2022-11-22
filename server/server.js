const express = require("express")
const cors = require("cors")
const bcryptjs = require('bcryptjs')
const dotenv = require('dotenv').config()

const app = express()
const db = require("./db")

app.use(cors())
// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

app.get("/", (req,res) => {
  res.status(200).send('Server is live..')
})

app.post("/register", async (req,res) => {
  //POST - destructed keys
  const {name, email, password} = req.body

  //Queries
  try {
    //Query definition
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
    return res.status(200).send({errMessage: "Email already exists"})

  } catch(err) {
    console.error(err)
  }
  //Error fallback
  return res.status(500).send({errMessage: "Register failed"})
})

app.post("/login", async (req, res) => {
  //POST - destructed keys
  const {email, password} = req.body
  console.log(email, password)
  //Query definition
  const queryEmailValid = {
    text: 'SELECT email FROM users WHERE email = $1',
    values: [email]
  }
  //test
  res.setHeader('Content-Type', 'application/json')

  try {
    //Query email to see if it exists with login email
    console.log('query email')
    const qev = await db.query(queryEmailValid)
    //Validate email
    if(email !== qev.rows[0]?.email) {
      console.log("email NOT valid")
      return res.status(200).send({errMessage: "Email doesn't exist"})
    }
    //Query definition
    const queryEmailPassword = {
      text: 'SELECT password FROM users WHERE email = $1',
      values: [email]
    }
    console.log("query hash pass")
    //Query email for hashed password
    const qep = await db.query(queryEmailPassword)
    console.log("pass", qep.rows[0]?.password)
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
      //Server response with user fata
      return res.status(200).send({id: qe.rows[0].uid, name: qe.rows[0].name, email: qe.rows[0].email, gender: qe.rows[0].gender, birthday: qe.rows[0].birthday})
    }
    //Unsuccessful login
    return res.status(200).send({errMessage: "Password incorrect"})
  } catch(err) {
    console.error(err)
  }
})

app.post("/saveEdits", async (req, res) => {
  const {id, edits} = req.body
  console.log("user edits", edits)

  try {
    //Edit number for query definition
    let qsNums = []
    //Edits keys for query definition
    let qsKeys = []
    //Edits values for query definition
    let qsValues = []
    //Set edit keys/values
    let qsInitNum = 1
    for(let [key, value] of Object.entries(edits)) {
      console.log(qsInitNum, key, value)
      qsNums.push(['$' + qsInitNum++])
      qsKeys.push(key)
      qsValues.push(value)
    }
    //Add id to query  definition
    let idNum = '$' + qsInitNum
    //Create query definition from edits in the form: (name, email, password) VALUES($1, $2, $3)
    const qs = `UPDATE users SET (${qsKeys.toString()}) VALUES(${qsNums.toString()}) WHERE uid = ${idNum}`
    console.log(qs)
    //change user properties based on what properties changed in database
    const queryUserUpdate = {
      text: qs,
      values: [...qsValues, id]
    }
    console.log('qs values', [...qsValues, id])
    const quu = await db.query(queryUserUpdate)
    console.log(quu.rows[0])
    const {uid, name, email, gender, birthday} = quu.rows[0]
    console.log('returning data', uid, name, email, gender, birthday)
    return res.status(200).send({id: uid, name: name, email: email, gender: gender, birthday: birthday})
  } catch(err) {
    console.error(err)
  }

  return res.status(500).send('Error updating user data to db')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})