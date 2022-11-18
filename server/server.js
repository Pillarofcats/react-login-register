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

app.post("/register", cors(), async (req,res) => {
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
    console.error(err.message)
  }
  //Error fallback
  return res.status(500).send({errMessage: "Register failed"})
})

app.post("/login", cors(), async (req,res) => {
  //POST - destructed keys
  let {email, password} = req.body
  //Query definition
  const queryEmailValid = {
    text: "SELECT email FROM users WHERE email = $1",
    value: [email]
  }
  console.log
  //Query email to see if it exists with login email
  const qev = await db.query(queryEmailValid)
  //Validate email
  if(email !== qev.rows[0]?.email) {
    return res.status(200).send({errMessage: "Email doesn't exist"})
  }
  //Query definition
  const queryEmailPassword = {
    text: "SELECT password FROM users WHERE email = $1",
    value: [email]
  }
  //Query email for hashed password
  const qep = await db.query(queryEmailPassword)
  console.log("pass", qep.rows[0]?.password)
  //Password comapare with bcryptjs
  const passMatch = await bcryptjs.compare(password, qep.rows[0]?.password)
  //Succesful login
  if(passMatch) {
    //Query definition
    const queryUser = {
      text: "SELECT * FROM users WHERE email = $1",
      value: [email]
    }
    //Query user data to be sent back to client
    const qe = await db.query(queryUser)
    //Server response with user fata
    return res.status(200).send({id: qe.rows[0].uid, name: qe.rows[0].name, email: qe.rows[0].email, gender: qe.rows[0].gender, birthday: qe.rows[0].birthday})
  } 
  //Unsuccessful login
  return res.status(200).send({errMessage: "Password incorrect"})
})

app.post("/saveEdits", (req, res) => {
  const edits = req.body
  console.log("user edits", edits)
  //find person in data base

  //change user properties based on what properties changed in database

  return res.status(200).send({edits})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})