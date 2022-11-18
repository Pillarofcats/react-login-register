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
  
  const {name, email, password} = req.body
  console.log("data", req.body)

  const queryCheckEmail = {
    text: 'SELECT email FROM users WHERE email = $1',
    values: [email],
  }

  const queryInsertUser = {
    text: 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING uid, name, email',
    values: [name, email]
  }

  try {
    //Query for registered email
    const qe = await db.query(queryCheckEmail)
    //Email does not exist, register user
    if(email !== qe.rows[0]?.email) {
      //Encrypt/Hash password
      const hashPass = await bcryptjs.hash(password, 10)
      console.log("hashpass", hashPass)

      //Insert user into users database
      const qiu = await db.query(queryInsertUser)
      console.log("qiu should return name, email", qiu.rows[0])
      console.log("uid", qiu.rows[0]?.uid)
      console.log("name", qiu.rows[0]?.name)
      console.log("email", qiu.rows[0]?.email)

      const queryInsertPass = {
        text: 'INSERT INTO hash_pass(id, password) VALUES($1, $2)',
        values: [qiu.rows[0]?.uid, hashPass]
      }
      
      //Insert hash password into hash_pass database using uid primary key from users database
      const qip = await db.query(queryInsertPass)
      console.log("dbRes should return uid, pass", qip.rows[0])
      console.log("id", qip.rows[0]?.id)
      console.log("pass", qip.rows[0]?.password)
      //Return uid,name, and email
      return res.status(200).send({id: qiu.rows[0]?.uid, name: qiu.rows[0]?.name, email: qiu.rows[0]?.email, gender: "", birthday: ""})
    }
    //Email already exists
    if (email === qe.rows[0]?.email) {
      return res.status(200).send({errMessage: "Email already exists"})
    }

  } catch(err) {
    console.error(err.message)
  }
  //Error fallback
  return res.status(500).send({errMessage: "Register failed"})
})

app.post("/login", (req,res) => {
  
  let data = req.body
  console.log("POST - Server received user login data:", data)

  if(data.email === mockUser.email && data.password === mockUser.password) {
    return res.status(200).send({id: mockUser.id, name: mockUser.name, email: mockUser.email})
  }
  
  if (data.email === mockUser.email && data.password !== mockUser.password ) {
    return res.status(200).send({errMessage: "Password incorrect"})
  }

  if(data.email !== mockUser.email) {
    return res.status(200).send({errMessage: "Email doesn't exist"})
  }

  return res.status(500).send({errMessage: "Login failed"})
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