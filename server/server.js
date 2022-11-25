//PACKAGE/MODULES
//Express library for nodejs
const express = require('express')
//Enable cross-origin resource sharing
const cors = require('cors')
//Password encryption
const bcryptjs = require('bcryptjs')
//Parse Cookies
const cookieParser = require('cookie-parser')
//Environment variable config
const dotenv = require('dotenv').config()
//Import database (PSQL)
const dbPool = require('./db')
//Cors options
const corsOptions = require('./corsOptions')

//EXPRESS APP
const app = express()

//MIDDLEWARE
//Cross-origin resource sharing (config)
app.use(cors(corsOptions))
//Parsing application/json
app.use(express.json())
//Parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
//Parsing cookies
app.use(cookieParser())

//CONTROLLERS
const postRegister = require('./controllers/postRegister')
const postLogin = require('./controllers/postLogin')
const postEditProfile = require('./controllers/postEditProfile')

//ENDPOINTS/ROUTES
//Register end-point/route
app.post('/register', (req, res) => postRegister(req, res, dbPool, bcryptjs))
//Login end-point/route
app.post('/login', (req, res) => postLogin(req, res, dbPool, bcryptjs))
//EditProfile end-point/route
app.post('/editProfile', (req, res) => postEditProfile(req, res, dbPool))

//Set port production/local
const PORT = process.env.PORT || 3000

//SERVER ACTIVE
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})