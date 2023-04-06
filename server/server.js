//PACKAGE/MODULES
//Express library for nodejs
const express = require('express')
//Enable cross-origin resource sharing
const cors = require('cors')
//Password encryption
const bcryptjs = require('bcryptjs')
//Encrypt/Decrypt session cookies
const cryptojs = require('crypto-js')
//Parse Cookies
const cookieParser = require('cookie-parser')
//Environment variable config
const dotenv = require('dotenv').config()
//Import database (PSQL)
const dbPool = require('./db')
//Cors options
const corsOptions = require('./corsOptions')
//Session options
const cookieSessionOptions = require('./cookieSessionOptions')

//EXPRESS APP
const app = express()

//MIDDLEWARE
//Cross-origin resource sharing config
app.use(cors(corsOptions))
//Parsing application/json
app.use(express.json())
//Parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
//Parsing cookies
app.use(cookieParser())

//CONTROLLERS
const postAuthUser = require('./controllers/postAuthUser')
const postRegister = require('./controllers/postRegister')
const postLogin = require('./controllers/postLogin')
const postEditProfile = require('./controllers/postEditProfile')
const postDiaryEntry = require('./controllers/postDiaryEntry')

//ENDPOINTS/ROUTES
//Register end-point/route
app.post('/register', (req, res) => postRegister(req, res, dbPool, bcryptjs))
//Login end-point/route
app.post('/login', (req, res) => postLogin(req, res, dbPool, bcryptjs, cryptojs, cookieSessionOptions))
//EditProfile end-point/route
app.post('/editProfile', (req, res) => postEditProfile(req, res, dbPool))
//AuthUser end-point/route
app.post('/authUser', (req, res) => postAuthUser(req, res, dbPool, cryptojs))
//DiaryEntry end-point/route
app.post('/diaryEntry', (req, res) => postDiaryEntry(req, res, dbPool))

//Set port production/local
const PORT = process.env.PORT || 3000

//SERVER ACTIVE
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})