const express = require("express")
const cors = require("cors")
const dotenv = require('dotenv').config()
console.log(process.env)

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
  console.log("email", email)

  const queryCheckEmail = {
  text: 'SELECT * FROM users WHERE email = $1',
  values: [email],
}
  try {
    const dbRes = await db.query(queryCheckEmail)
    console.log("dbRes", dbRes)
    console.log("rows[0]", dbRes.rows[0])
    console.log("rows[0].email", dbRes.rows[0].email)

    if(email !== dbRes.rows[0]) {
      return res.status(200).send({id: Date.now(), name: name, email: email, gender: "", birthday: ""})
    }
    
    if (email === dbRes.rows[0]) {
      return res.status(200).send({errMessage: "Email already exists"})
    }

  } catch(err) {
    console.error(err)
  }

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