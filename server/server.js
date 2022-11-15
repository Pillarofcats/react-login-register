const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

const mockUser = {
  id: Date.now(),
  name: "Jacob",
  email: "J@W.com",
  password: 'hash'
}

app.get("/", (req,res) => {
  res.status(200).send('Server is live..')
})

app.post("/register", (req,res) => {
  
  let data = req.body
  console.log("data", req.body)
  console.log("POST - Server received user register data:", data)

  if(data.email !== mockUser.email) {
    return res.status(200).send({id: Date.now(), name: data.name, email: data.email})
  }
  
  if (data.email === mockUser.email) {
    return res.status(200).send({errMessage: "Email already exists"})
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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})