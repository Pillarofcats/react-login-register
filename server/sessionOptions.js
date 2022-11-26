const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  path: '/login',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: secure, maxAge: 60000,  }
}

module.exports = sessionOptions